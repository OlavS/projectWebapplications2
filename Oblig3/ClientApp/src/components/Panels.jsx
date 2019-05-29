import React from 'react';
import { PanelGroup, Panel } from 'react-bootstrap';
import FAQQuestionPanels from './FAQQuestionPanels';
import AdminQuestionPanels from './AdminQuestionPanels'
import { GetIndexWithId } from '../utils/Arrays';

/**
 * Contains the category panels, the parts which are identical for both admin and faq is wrapped 
 * around AdminQuestionPanels and FAQQuestionPanels props.admin then determines if the faq or 
 * admin question panels should be displayed.
 * @param {any} props contains all categories containing all the questions, a search string,
 * a call to upVote, and downVote or the answerQuestionModalShow call, depending on if it is called 
 * from Admin.jsx or FAQ.jsx.
 */
export default function Panels(props) {
    return (
        <PanelGroup accordion id="CategoryPanelGroup">
            {props.categories.filter(category => {
                return category.questions.some(question => {
                    return question.title.toLowerCase().includes(props.searchString) && (props.admin || question.answer)
                })
            }).map(category => 
                <React.Fragment key={category.id}>
                    <Panel eventKey={category.id}>
                        <Panel.Heading>
                            <Panel.Title toggle>{category.name}</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible={props.searchString === ""}>
                            <h4>Spørsmål</h4>
                            {props.admin ?
                                (<AdminQuestionPanels
                                    searchString={props.searchString}
                                    category={category}
                                    catIndex={GetIndexWithId(props.categories, category.id)}
                                    answerQuestionModalShow={(catIndex, queIndex, question) =>
                                        props.answerQuestionModalShow(catIndex, queIndex, question)}
                                />) :
                                (<FAQQuestionPanels
                                    searchString={props.searchString}
                                    category={category}
                                    catIndex={GetIndexWithId(props.categories, category.id)}
                                    upVote={props.upVote}
                                    downVote={props.downVote}
                                />)
                            }
                        </Panel.Body>
                    </Panel>
                </React.Fragment>
            )}
        </PanelGroup>
    );
}