import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NotesIcon from '@material-ui/icons/Note';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import ArchiveIcon from '@material-ui/icons/Archive';
import DeleteIcon from '@material-ui/icons/Delete';
import {withRouter} from 'react-router-dom';

 class DrawerComponent extends Component {
    constructor(props){
        super(props)      
    }
    handleNotes =()=>{
        this.props.history.push("/dashboard");
    }   
    handleReminders =()=>{
        this.props.history.push("/reminders");
    }
    handleArchieve =()=>{
        this.props.history.push("/archive");
    }
    handleTrash =()=>{
        this.props.history.push("/trash");
    }
    render() {
        return (
            <Drawer
                className="drawer"
                variant="persistent"
                overflow="auto"
                open={this.props.drawerOpen} >
                <List>
                    <ListItem button key="Note" onClick={this.handleNotes}>
                        <ListItemIcon><NotesIcon /></ListItemIcon>
                        <ListItemText primary="Note" />
                    </ListItem>
                    <ListItem button key="Reminders" onClick={this.handleReminders}>
                        <ListItemIcon><AddAlertIcon /></ListItemIcon>
                        <ListItemText primary="Reminders" />
                    </ListItem>
                    <Divider />
                    <ListItem button key="Edit labels" onClick={this.handlelabel}>
                        <ListItemIcon><ArchiveIcon /></ListItemIcon>
                        <ListItemText primary="Archive" />
                    </ListItem>
                    <Divider />
                    <Divider />
                    <ListItem button key="Archive" onClick={this.handleArchieve}>
                        <ListItemIcon><ArchiveIcon /></ListItemIcon>
                        <ListItemText primary="Archive" />
                    </ListItem>
                    <ListItem button key="Trash" onClick={this.handleTrash}>
                        <ListItemIcon><DeleteIcon /></ListItemIcon>
                        <ListItemText primary="Trash" />
                    </ListItem>
                    <Divider />
                </List>
            </Drawer>
        );
    }
}

export default withRouter(DrawerComponent)