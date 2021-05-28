import Text from "@vkontakte/vkui/dist/components/Typography/Text/Text";
import {Button, Div} from "@vkontakte/vkui";
import React from 'react';


export class Game extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Div style={{textAlign: 'center'}}>
                <div>
                    <Text>{this.props.currentPhrase?.phrase}</Text>
                    <div className={'d-flex justify-content-center align-items-center'}>
                        <Text>{this.props.currentPhrase?.transcription} </Text>
                    </div>
                    <Button style={{
                        float: 'none',
                        marginRight: 'auto',
                        marginTop: "15px",
                        width: '80%'
                    }}
                            onClick={() => this.props.checkAnswer(this.props.answers[0])}>{this.props.answers[0]?.translation}</Button>
                    <Button style={{
                        float: 'none',
                        marginRight: 'auto',
                        marginTop: "15px",
                        width: '80%'
                    }} onClick={() => this.props.checkAnswer(this.props.answers[1])}>{this.props.answers[1]?.translation}</Button>
                    <Button style={{
                        float: 'none',
                        marginRight: 'auto',
                        marginTop: "15px",
                        width: '80%'
                    }} onClick={() => this.props.checkAnswer(this.props.answers[2])}>{this.props.answers[2]?.translation}</Button>
                    <Button style={{
                        float: 'none',
                        marginRight: 'auto',
                        marginTop: "15px",
                        width: '80%'
                    }} onClick={() => this.props.checkAnswer(this.props.answers[3])}>{this.props.answers[3]?.translation}</Button>
                </div>
            </Div>
        )
    }
}