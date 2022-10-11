import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

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

import { validatePhoto } from "./services/photoValidation";

import { Banner } from "./components/Banner";
import { IconButton } from "./components/IconButton";
import { HelpSection } from "./components/HelpSection";
import { CropperWrapper } from "./components/CropperWrapper";

import s from "./App.module.css";

type AppProps = {
  fieldId: string;
};

const stencilRatio = 30 / 45;

const resetFileInput = (inputField: HTMLInputElement): void => {
  inputField.value = "";
  inputField.files = null;
};

const defaultSize: DefaultSize = ({ imageSize, visibleArea }) => {
  return {
    width: (visibleArea || imageSize).width,
    height: (visibleArea || imageSize).height,
  };
};

const stencilSize: StencilSize = ({ boundary }) => {
  const largestBoundarySize = Math.min(boundary.width, boundary.height);

  return {
    width: largestBoundarySize * stencilRatio - 48,
    height: largestBoundarySize - 120,
  };
};

const cleanupFile = (fileUrlRef: MutableRefObject<string | undefined>) => {
  if (fileUrlRef.current) {
    URL.revokeObjectURL(fileUrlRef.current);
  }
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

const App = (props: AppProps) => {
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
  }, [props.fieldId]);

  const onConfirm = useCallback(async () => {
    if (!cropperRef.current || !pickedUpFile.current) {
      return;
    }

    setValidating(true);
    const blob = await new Promise<Blob>((done, reject) => {
      cropperRef.current?.getCanvas()?.toBlob((blob) => {
        if (blob) {
          done(blob);
        } else {
          reject(new Error("Could not save the cropped image"));
        }
      });
    });

    const { response, body } = await validatePhoto(blob);
    setValidating(false);

    if (!response.ok) {
      alert(`${body.message}: ${body.errorCodes!.join(", ")}`);
      return;
    }

    // create a new file and add it to the field
    const field = document.getElementById(props.fieldId) as HTMLInputElement;
    const newFile = new File([blob], pickedUpFile.current.name, {
      type: pickedUpFile.current.type,
    });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(newFile);
    field.files = dataTransfer.files;

    cleanupFile(fileUrl);
    setModalOpen(false);
  }, [
    props.fieldId,
    fileUrl.current,
    cropperRef.current,
    pickedUpFile.current,
  ]);

  const onModalClose = () => {
    cleanupFile(fileUrl);
    setModalOpen(false);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      contentLabel="Photo Validation Modal"
      onRequestClose={onModalClose}
      ariaHideApp={false}
      style={customStyles}
    >
      <Banner className={s.modalBanner} />
      <div className={s.cropperWrapper}>
        {!isHelpOpen ? (
          <>
            <FixedCropper
              className={s.cropper}
              src={fileUrl.current}
              wrapperComponent={CropperWrapper}
              wrapperProps={{
                validating: isValidating,
                onHelp: () => setHelpOpen(true),
              }}
              stencilSize={stencilSize}
              defaultSize={defaultSize}
              onReady={(ref) => {
                cropperRef.current = ref;
              }}
              minWidth={100}
              minHeight={150}
              stencilProps={{
                ratio: stencilRatio,
                lines: false,
                movable: false,
                handlers: false,
                resizable: false,
              }}
              imageRestriction={ImageRestriction.stencil}
            />
            <div className={s.navigation}>
              <IconButton
                zoomOnHover={true}
                iconUrl={cancelUrl}
                onClick={onModalClose}
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
};

export default App;
