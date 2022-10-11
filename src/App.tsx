import { useEffect, useRef, useState } from "react";
import {
  CropperRef,
  FixedCropper,
  ImageRestriction,
  DefaultSize,
  StencilSize,
} from "react-advanced-cropper";
import Modal, { Styles } from "react-modal";

// resources
import "react-advanced-cropper/dist/style.css";
import "@fontsource/lato";

import cancelUrl from "./assets/cancel.svg";
import checkUrl from "./assets/check.svg";

import { Banner } from "./components/Banner";
import { IconButton } from "./components/IconButton";
import { HelpSection } from "./components/HelpSection";
import { CropperWrapper } from "./components/CropperWrapper";

import "./App.css";

type AppProps = {
  fieldId: string;
};

const resetFileInput = (inputField: HTMLInputElement): void => {
  inputField.value = "";
  inputField.files = null;
};

const customStyles: Styles = {
  overlay: {
    fontFamily: '"Lato", Arial, sans-serif',
    zIndex: 1000,
    backgroundColor: "rgba(22, 21, 21, 0.95)",
  },
  content: {
    width: "90%",
    padding: "0",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    border: "0px",
    backgroundColor: "rgba(22, 21, 21, 0.95)",
    transform: "translate(-50%, -50%)",
  },
};

function App(props: AppProps) {
  const fileUrl = useRef<string>();
  const cropperRef = useRef<CropperRef | null>(null);
  const [isHelpOpen, setHelpOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isValidating, setValidating] = useState(false);

  const pickedUpFile = useRef<File | null>(null);

  useEffect(() => {
    const field = document.getElementById(props.fieldId) as HTMLInputElement;

    const onChange = (event: Event) => {
      const inputField = event.target as HTMLInputElement;

      const file = inputField.files?.item(0);
      if (file) {
        event.preventDefault();
        pickedUpFile.current = file;
        fileUrl.current = URL.createObjectURL(file);
        resetFileInput(inputField);
        setModalOpen(true);
      }
    };

    field?.addEventListener("change", onChange);

    return () => {
      // console.log("unmounted");
      // field?.removeEventListener("change", onChange);
      // if (fileUrl.current) {
      //   URL.revokeObjectURL(fileUrl.current);
      // }
    };
  }, [props.fieldId]);

  const onConfirm = async () => {
    if (cropperRef.current) {
      setValidating(true);
      cropperRef.current.getCanvas()?.toBlob(async (blob) => {
        const response = await fetch(
          "https://99c5jwwg1d.execute-api.eu-west-1.amazonaws.com/validate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/octet-stream",
            },
            body: blob,
          }
        );

        const result = await response.json();
        if (!response.ok) {
          alert(`${result.message}: ${result.errorCodes.join(", ")}`);
        } else {
          alert(`${result.message}`);
          setModalOpen(false);

          const field = document.getElementById(
            props.fieldId
          ) as HTMLInputElement;
          const file = new File([blob as Blob], pickedUpFile.current!.name, {
            type: pickedUpFile.current?.type,
          });

          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          field.files = dataTransfer.files;
        }
        setValidating(false);
      });
    }
  };

  const defaultSize: DefaultSize = ({ imageSize, visibleArea }) => {
    return {
      width: (visibleArea || imageSize).width,
      height: (visibleArea || imageSize).height,
    };
  };

  const ratio = 30 / 45;

  const stencilSize: StencilSize = ({ boundary, imageSize }) => {
    const largestBoundarySize = Math.min(boundary.width, boundary.height);

    return {
      width: largestBoundarySize * ratio - 48,
      height: largestBoundarySize - 120,
    };
  };

  return (
    <Modal
      isOpen={isModalOpen}
      contentLabel="Example Modal"
      onRequestClose={() => setModalOpen(false)}
      ariaHideApp={false}
      style={customStyles}
    >
      <Banner className="modal-banner" />
      <div className="cropper-wrapper">
        {!isHelpOpen ? (
          <>
            <FixedCropper
              wrapperComponent={CropperWrapper}
              wrapperProps={{
                validating: isValidating,
                onHelp: () => setHelpOpen(true),
              }}
              defaultSize={defaultSize}
              onReady={(ref) => {
                cropperRef.current = ref;
              }}
              src={fileUrl.current}
              minWidth={100}
              minHeight={150}
              className={"cropperTest"}
              stencilSize={stencilSize}
              stencilProps={{
                ratio,
                handlers: false,
                lines: false,
                movable: false,
                resizable: false,
              }}
              imageRestriction={ImageRestriction.stencil}
            />
            <div className="navigation">
              <IconButton
                zoomOnHover={true}
                iconUrl={cancelUrl}
                onClick={() => setModalOpen(false)}
              />
              <IconButton
                zoomOnHover={true}
                iconUrl={checkUrl}
                onClick={onConfirm}
              />
            </div>
          </>
        ) : (
          <HelpSection onClose={() => setHelpOpen(false)} />
        )}
      </div>
    </Modal>
  );
}

export default App;
