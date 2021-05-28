import {Avatar, Button, Cell, Div, Group, Header, IOS, Panel, PanelHeader, platform} from "@vkontakte/vkui";
import {CollectionCard} from "../Components/CollectionCard";
import {useEffect, useState} from "react";
import axios from "axios";
import {PhraseCard} from "../Components/PhraseCard";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";

const osName = platform();
export const PhrasePanel = ({id, name, back}) => {
    const [phrases, setPhrases] = useState([]);

    useEffect(async () => {
        const response = await axios.get('data.json');
        setPhrases(response.data[name]);
    }, [])

    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderButton
                    onClick={back}
                    data-to={'collection'}
                >
                    {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </PanelHeaderButton>}>{name}</PanelHeader>
            <Div>
                {phrases && phrases.map(phrase => {
                    return (
                        <PhraseCard
                            translation={phrase.translation}
                            transcription={phrase.transcription}
                            phrase={phrase.phrase}
                        />
                    )
                })
                }
            </Div>
        </Panel>
    )
};