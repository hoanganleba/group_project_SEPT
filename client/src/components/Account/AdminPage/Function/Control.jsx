import React, { Component } from 'react';
import Search from './Search';
// import Sort from './Sort';

class Control extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
           
        };

        this.handleAdd = this.handleAdd.bind(this);

        // props.onClickSearchGo
    }

    handleAdd(){
        this.props.onClickAdd();
    }

    render() {
        // let {orderBy, orderDir}     = this.props;

        // let elmButton = <button onClick={this.handleAdd} type="button" className="btn btn-info btn-block">Add Task</button>;
        // if(this.props.isShowForm === true) {
        //     elmButton = <button onClick={this.handleAdd} type="button" className="btn btn-success btn-block">Close Form</button>
        // }

        return (
            <div className="row">

                {/* SEARCH : START */}
                <Search onClickGo={this.props.onClickSearchGo}/>
                {/* SEARCH : END */}

            
            </div>
        );
    }
}

export default Control;