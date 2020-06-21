import React, {Component} from 'react';



class Last20Victims extends React.Component {
 
    constructor (props) {
        super(props);
        this.state= {
            items:[],
            isLoaded: false, 
        }
    }

    componentDidMount(){

        fetch('http://cors-anywhere.herokuapp.com/policetracker.link/shootings/last20')
        .then(res => res.json())
        .then(json=> {   
            this.setState({
                isLoaded: true,
                items: json,
            })

        });
    }
 
    render(){

        var{isLoaded,items}= this.state;
        if (!isLoaded) {
            return <div> Loading...</div>
        }

        else {

            return(
                <div className= "Last20Victims">
                <ul>

                    {items.map(item => (
                        <li key={item.id}>
                         {item.victim_name} Murdered in {item.County} {item.state}
                        </li>
                    ))};
                    
                </ul>

                </div>
    

            )
        }

    };
}


export default Last20Victims;