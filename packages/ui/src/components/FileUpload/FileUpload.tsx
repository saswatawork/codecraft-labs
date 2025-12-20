import * as React from 'react';
import { cn } from '../../utils';
import { Button } from '../Button';
import { Input } from '../Input';

export interface FileUploadProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  onFileSelect: (file: File | null) => void;
  buttonText?: string;
  showFileName?: boolean;
  maxSize?: number; // in bytes
  onError?: (error: string) => void;
}

export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      onFileSelect,
      buttonText = 'Choose File',
      showFileName = true,
      maxSize,
      onError,
      accept,
      className,
      ...props
    },
    ref,
  ) => {
    const [fileName, setFileName] = React.useState<string>('');
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;

      if (file) {
        // Check file size if maxSize is specified
        if (maxSize && file.size > maxSize) {
          const sizeMB = (maxSize / 1024 / 1024).toFixed(2);
          const error = `File size exceeds ${sizeMB}MB`;
          onError?.(error);
          setFileName('');
          onFileSelect(null);
          if (inputRef.current) {
            inputRef.current.value = '';
          }
          return;
        }

        setFileName(file.name);
        onFileSelect(file);
      } else {
        setFileName('');
        onFileSelect(null);
      }
    };

    const handleButtonClick = () => {
      inputRef.current?.click();
    };

    const handleClear = () => {
      setFileName('');
      onFileSelect(null);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    };

    return (
      <div className={cn('space-y-2', className)}>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
            {...props}
          />
          <Button type="button" variant="outline" onClick={handleButtonClick}>
            {buttonText}
          </Button>
          {fileName && showFileName && (
            <>
              <span className="flex items-center px-3 py-2 text-sm text-muted-foreground bg-muted rounded-md truncate flex-1">
                {fileName}
              </span>
              <Button type="button" variant="ghost" size="sm" onClick={handleClear}>
                Clear
              </Button>
            </>
          )}
        </div>
      </div>
    );
  },
);

FileUpload.displayName = 'FileUpload';

export default FileUpload;
