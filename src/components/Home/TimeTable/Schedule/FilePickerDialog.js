import 'react-calendar/dist/Calendar.css';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import React, { useRef, useState } from 'react';

import { parseString } from 'cal-parser';

export const useFilePickerDialog = () => {
  const [open, setOpen] = useState(false);
  const openDialog = (newOpen = !open) => {
    setOpen(newOpen);
  };

  const newFilePickerDialog = (props) => (
    <FilePickerDialog {...{ ...props, open, setOpen }} />
  );
  return [openDialog, newFilePickerDialog];
};

const FilePickerDialog = ({ open, setOpen }) => {
  const inputFile = useRef(null);
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      style={{ padding: 5 }}
      PaperProps={{ style: { width: '50%' } }}
      aria-labelledby='form-dialog-title'>
      <DialogContent>
        <DialogTitle style={{ cursor: 'default' }} id='form-dialog-title'>
          Pick .ico file
        </DialogTitle>
        <input
          onChange={async (e) => {
            console.log(
              e,
              e.target.files[0],
              // await e.target.files[0].text(),
              parseString(await e.target.files[0].text())
            );
          }}
          type='file'
          ref={inputFile}
          id='file-selector'
          accept='.ics'
          style={{ display: 'none' }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false);
          }}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            inputFile.current.click();
            // setOpen(false);
          }}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilePickerDialog;
