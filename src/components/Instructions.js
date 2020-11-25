import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import "../Styles/Instructions.css"


class Instructions extends React.Component {
   
    render() {
        return (
            <div class="prm-background">
                <div className='instructions-wrapper'>
                    <Card className='instructions'>
                        <Card.Header className='instructions-card-header'>PRM Platform</Card.Header>
                        <Card.Body>
                            <Card.Title className='instructions-card-title'>Installing PRM Platform</Card.Title>
                            <Card.Text>
                                First you'll have to get from github the last version of 'src' and 'public' versions. After doing that, create a new react app, using the command "npx create-react-app ~folder_name~". After
                                the app was created, you will have to replace 'src' and 'public' with the versions from github. Last step is installing the packages you need. For that, you will
                                execute the command 'npm start' in the terminal of the main app folder (~folder_name~). Errors will be thrown, and you will have to install the package shown in the
                                warning. Repeat last step until everything works fine. :)
                            </Card.Text>
                            <Card.Title className='instructions-card-title'>Commands used by React</Card.Title>
                            <Card.Text>
                                -npm start (start the react app and the live server hosted on localhost:3000)
                            </Card.Text>
                            <Card.Text>
                                -npx create-react-app ~folder_name~ (create a folder with the name ~folder_name~ with a new React App)
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    

                    <Card className='instructions'>
                        <Card.Header className='instructions-card-header'>Here you place the topic title</Card.Header>
                        <Card.Body>
                            <Card.Title className='instructions-card-title'>Here your place the sub-topic title</Card.Title>
                            <Card.Text>
                                Here you place the card text
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    
                </div>
            </div>
        );
    }
}

export default Instructions;