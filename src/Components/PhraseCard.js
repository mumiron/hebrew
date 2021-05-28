import React from 'react';
import Text from "@vkontakte/vkui/dist/components/Typography/Text/Text";
import Icon28VolumeOutline from '@vkontakte/icons/dist/28/volume_outline';
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import axios from "axios";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import bridge from "@vkontakte/vk-bridge";
import './Card.css'
import Group from "@vkontakte/vkui/dist/components/Group/Group";

export class PhraseCard extends React.Component {


    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Group>

                <div className={'d-flex flex-row justify-content-between '}>
                    <div className={'d-flex flex-column'}>
                        <Text weight={'semibold'}>{this.props.translation}</Text>
                        <Text weight={'semibold'} style={{color: 'DeepSkyBlue'}}>{this.props.phrase}</Text>
                        <Text weight={'regular'}>{this.props.transcription}</Text>
                    </div>
                </div>

            </Group>
        )
    }
}

