import {
    Avatar,
    Button,
    Cell,
    Div,
    Group,
    Header,
    IOS,
    Panel,
    PanelHeader,
    platform,
    PopoutWrapper
} from "@vkontakte/vkui";
import {useEffect, useState} from "react";
import axios from "axios";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Text from "@vkontakte/vkui/dist/components/Typography/Text/Text";
import {Game} from "../Components/Game";
import {GamePopout} from "../Components/GamePopout";
import {RightAnswerPopout} from "../Components//RightAnswerPopout";
import {GameDonePopout} from "../Components/GameDonePopout";


const osName = platform();
export const ChallengeGame = ({id, name, back, showGamePopout, showGameDonePopout}) => {
    const [phrases, setPhrases] = useState([]);
    const [currentPhrase, setCurrentPhrase] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [guessCount, setCount] = useState(0);


    useEffect(async () => {
        const response = await axios.get('data.json');
        const shuffledPhrases = shuffle(response.data[name]);
        await setPhrases(shuffledPhrases);
        await setCurrentPhrase(shuffledPhrases[0]);
    }, [])

    useEffect(() => {
        function getAnswers() {
            if (currentPhrase) {
                const answers = [];
                answers.push(currentPhrase);
                for (let j = 0; j < 3; j++) {
                    let randomAnswer = currentPhrase;
                    let flag = true;
                    do {
                        let i = Math.floor(Math.random() * (phrases.length - 1));
                        randomAnswer = phrases[i];
                        if (!answers.includes(randomAnswer)) {
                            flag = false;
                        }
                    } while (flag);
                    answers.push(randomAnswer)
                }
                setAnswers(shuffle(answers));
            }
        }

        getAnswers();
    }, [currentPhrase]);

    function checkAnswer(answer) {
        if ((phrases.indexOf(currentPhrase) + 1) === phrases.length) {
            showGameDonePopout(guessCount, phrases.length);
            return;
        }
        if (answer === currentPhrase) {
            showGamePopout(currentPhrase, true);
            setCount(guessCount + 1);
            setCurrentPhrase(phrases[phrases.indexOf(currentPhrase) + 1]);
        } else {
            showGamePopout(currentPhrase, false);
            setCurrentPhrase(phrases[phrases.indexOf(currentPhrase) + 1]);
        }
    };

    return (
        <Panel id={id} >
            <PanelHeader
                left={<PanelHeaderButton
                    onClick={back}
                    data-to={'challenge'}
                >
                    {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </PanelHeaderButton>}>{name}</PanelHeader>
                <Game currentPhrase={currentPhrase} answers={answers} checkAnswer={checkAnswer}/>
        </Panel>
    )
}
;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}