import React,{Component} from 'react'
import ServiceCard from '../component/serviceCardComponent'
export default class ServiceCardPage extends Component{
    render(){
        return(
            <div>>
                <ServiceCard props = {this.props}/>
            </div>
        )
    }
}

