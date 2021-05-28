import React, {useState, useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {View, ScreenSpinner, AdaptivityProvider, AppRoot, Epic, PopoutWrapper} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import ProfilePanel from './panels/ProfilePanel';
import {CollectionPanel} from "./panels/CollectionPanel";
import {PhrasePanel} from "./panels/PhrasePanel";
import axios from "axios";
import TabbarItem from "@vkontakte/vkui/dist/components/TabbarItem/TabbarItem";
import Tabbar from "@vkontakte/vkui/dist/components/Tabbar/Tabbar";
import Icon28ListPlayOutline from "@vkontakte/icons/dist/28/list_play_outline";
import Icon28GameOutline from "@vkontakte/icons/dist/28/game_outline";
import Icon28UserCircleOutline from "@vkontakte/icons/dist/28/user_circle_outline";
import {ChallengePanel} from "./panels/ChallengePanel";
import {ChallengeGame} from "./panels/ChallengeGame";
import {GamePopout} from "./Components/GamePopout";
import {GameDonePopout} from "./Components/GameDonePopout";
import {RightAnswerPopout} from "./Components/RightAnswerPopout";

const App = () => {
    const [activePanel, setActivePanel] = useState('collection');
    const [fetchedUser, setUser] = useState(null);
    const [activeStory, setActiveStory] = useState('collection');
    const [selectedCategory, setCategory] = useState(null);
    const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);
    const [gamePopout, setGamePopout] = useState(null);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        bridge.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
        });

        async function fetchData() {
            const user = await bridge.send('VKWebAppGetUserInfo');
            setUser(user);
            setPopout(null);
        }

        fetchData();
    }, []);

    useEffect(async () => {
        const response = await axios.get('data.json');
        for (const category in response.data) {
            const temp = categories;
            temp.push({name: category, count: response.data[category].length})
            setCategories(temp)
        }
        ;
    }, [])
    const go = e => {
        setActivePanel(e.currentTarget.dataset.to);
    };
    const openCategory = e => {
        setCategory(e.currentTarget.dataset.name)
        setActivePanel(e.currentTarget.dataset.to);
    }
    const onStoryChange = e => {
        if (activeStory == e.currentTarget.dataset.story) {
            return;
        }
        setActiveStory(e.currentTarget.dataset.story);
        setActivePanel(e.currentTarget.dataset.story);
    };
    const showGamePopout = (phrase, correct) => {
        if (!correct) {
            setGamePopout(
                <PopoutWrapper>
                    <GamePopout phrase={phrase}
                                close={() => setGamePopout(null)}
                    />
                </PopoutWrapper>
            )
        }else {
            setGamePopout(
                <PopoutWrapper>
                    <RightAnswerPopout phrase={phrase}
                                       close={() => setGamePopout(null)}
                    />
                </PopoutWrapper>
            )
        }
    };
    const showGameDonePopout = (guessCount, totalCount) => {
        setGamePopout(
            <PopoutWrapper>
                <GameDonePopout guessCount={guessCount}
                                totalCount={totalCount}
                                close={() => setGamePopout(null)}
                />
            </PopoutWrapper>
        );
        setActivePanel('challenge');
    };
    return (
        <AdaptivityProvider>
            <AppRoot>
                <Epic activeStory={activeStory} tabbar={
                    <Tabbar itemsLayout={'vertical'}>
                        <TabbarItem
                            text="Моя подборка"
                            data-story={'collection'}
                            selected={activeStory === 'collection'}
                            onClick={onStoryChange}
                        ><Icon28ListPlayOutline/></TabbarItem>
                        <TabbarItem
                            text="Тестирование"
                            data-story={'challenge'}
                            selected={activeStory === 'challenge'}
                            onClick={onStoryChange}
                        ><Icon28GameOutline/></TabbarItem>
                        <TabbarItem
                            text="Профиль"
                            data-story={'profile'}
                            selected={activeStory === 'profile'}
                            onClick={onStoryChange}
                        ><Icon28UserCircleOutline/></TabbarItem>
                    </Tabbar>
                }>
                    <View id={'collection'} activePanel={activePanel} popout={popout}>
                        <CollectionPanel id={'collection'} go={openCategory} categories={categories}/>
                        <PhrasePanel id={'phrases'} back={go} name={selectedCategory}/>
                    </View>
                    <View id={'challenge'} activePanel={activePanel} popout={gamePopout}>
                        <ChallengePanel id='challenge' go={openCategory} categories={categories}/>
                        <ChallengeGame id='challengeGame' back={go} name={selectedCategory}
                                       showGamePopout={showGamePopout}
                                       showGameDonePopout={showGameDonePopout}
                        />
                    </View>
                    <View id={'profile'} activePanel={activePanel}>
                        <ProfilePanel id='profile' fetchedUser={fetchedUser}/>
                    </View>
                </Epic>
            </AppRoot>
        </AdaptivityProvider>
    );
}

export default App;
