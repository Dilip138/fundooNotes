import {Component} from 'react'
import CreateNotes from '../component/createNotesComponent'
export default class createNotesPage extends Component{
    render(){
        return(
            <div>
                <CreateNotes props ={this.props}/>
            </div>
        )
    }
}
