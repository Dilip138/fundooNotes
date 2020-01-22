import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjectsOutlined';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import ArchiveIcon from '@material-ui/icons/ArchiveOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import { withRouter } from 'react-router-dom';
import LabelIcon from '@material-ui/icons/Label';
import { getNoteLabels} from '../services/noteServices';

class DrawerComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allLabels: []
        }
    }
    componentDidMount() {
        this.handleGetNoteLabels()
    }
    handleNotes = () => {
        this.props.history.push("/dashboard");
    }
    handleReminders = () => {
        this.props.history.push("/reminders");
    }
    handleArchieve = () => {
        this.props.history.push("/archive");
    }
    handleTrash = () => {
        this.props.history.push("/trash");
    }
    handleGetNoteLabels = () => {
        getNoteLabels().then(res => {
            //console.log("response from get label api", res);
            this.setState({
                allLabels: res.data.data.details
            })
            console.log("response from get label api", this.state.allLabels);

        }).catch(err => {
            console.log("err occur while hetting back-end api", err);

        })
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
                        <ListItemIcon><EmojiObjectsIcon /></ListItemIcon>
                        <ListItemText primary="Note" />
                    </ListItem>
                    <ListItem button key="Reminders" onClick={this.handleReminders}>
                        <ListItemIcon><NotificationsIcon /></ListItemIcon>
                        <ListItemText primary="Reminders" />
                    </ListItem>
                    <Divider />
                    <div style={{ fontSize: '13px', margin: '20px' }}>LABELS</div>
                    <div className="allLabel">
                        {this.state.allLabels.map(key => {
                            return (
                                <ListItem button key="Reminders" onClick={this.handleReminders}>
                                    <ListItemIcon><LabelIcon /></ListItemIcon>
                                    <ListItemText> {key.label}</ListItemText>
                                </ListItem>
                            )
                        })}
                    </div>
                    <ListItem button key="Edit labels" onClick={this.handlelabel}>
                        <ListItemIcon><EditIcon /></ListItemIcon>
                        <ListItemText primary="Edit labels" />
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
