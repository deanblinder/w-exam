import React, {useState} from 'react';
import './App.css';
import {Tree} from "./tree";
import {Backdrop, Button, Modal, Fade, Box, CircularProgress, Divider} from '@mui/material';
import {treeActions} from "./tree/treeActions";
import {File} from './tree/types';

const TIME_UNTIL_FETCHING_DATA = 1000

const boxStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'lightBlue',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height:'80%',
    overflowY:'scroll',
}

function App() {
    const [treeFiles,setFiles] = useState<File[] | undefined>(undefined);
    const [isLoading,setIsLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);


    const fetchData = async () => {
        if (treeFiles === undefined){
            setIsLoading(true);
            setTimeout(async () => {
                const randomFiles: File[] = await treeActions.getRandomChildren();
                setFiles(randomFiles);
                setIsLoading(false);
            },TIME_UNTIL_FETCHING_DATA);
        }
        setOpen(true);

    }
    return (
        <div className="App">
            <h1>WIZ</h1>
            <Button variant="contained" onClick={fetchData}>Show Files</Button>
            {isLoading ? <CircularProgress style={{display:'flex',justifyContent:'center',margin:'auto',marginTop:"10px"}}/> :
                <Modal
                    style={{marginTop:'10%',marginBottom:'10%'}}
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                    disableScrollLock={ true }

                >
                    <Fade in={open}>
                        <Box sx={boxStyle}>
                                <div >
                                    <div>
                                        <h1>File System</h1>
                                    </div>
                                    <Divider/>
                                    <Tree files={treeFiles}/>
                                </div>
                        </Box>
                    </Fade>
                </Modal>}
        </div>
    );
}

export default App;
