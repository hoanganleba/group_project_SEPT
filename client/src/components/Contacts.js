import React, {Component} from "react";
import axios from 'axios';
class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    async fetchData() {
        const response = await axios.get('http://localhost:8080/api/contacts');
        const {data} = await response
        this.setState({data: data})
        console.log(this.state.data);
    }
    componentDidMount() {
        this.fetchData().catch((err)=>console.log(err))
    }
    render() {
        return(
            <div>
            {
                this.state.data.map((item, index) => {
                    return(
                    <div key={index}>
                        {item.firstName}
                    </div>
                    )
                })
            }
            </div>
        )

    }
}

export default Contacts