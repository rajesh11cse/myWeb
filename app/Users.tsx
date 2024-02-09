import React from 'react';
import { Button } from 'reactstrap';


class Users extends React.Component<any>{
    navigateHome = () =>{
        //console.log(this.props.history);
        this.props.history.push('/');
    }

    render(){
        // console.log(this.props);
        return(
            <div>
                <p>This is Users component...</p>
                {/* <Button color="danger">Danger!</Button> */}
                <button onClick={this.navigateHome}>
                    Home
                </button>
            </div>
        );
    }
}

export default Users;