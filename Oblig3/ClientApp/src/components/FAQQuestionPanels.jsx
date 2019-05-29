import React from 'react';
import { PanelGroup, Panel } from 'react-bootstrap';
import FAQQuestionContent from './FAQQuestionContent';
import { GetIndexWithId } from '../utils/Arrays';

/**
 * Creates the question panel groups for the faq feature.
 * @param {any} props contains a category, having all the questions, a search string and the 
 * category index, as well as the upVote and downVote feature handled in FAQ.js.
 */
export default function FAQQuestionPanels(props) {
    return (
        <PanelGroup accordion id="FAQQuestionPanels">
            {props.category.questions.filter(question => {
                return question.title.toLowerCase().includes(props.searchString)
            }).map((question) =>
                question.answer
                    ? (<React.Fragment key={question.id}>
                          <Panel bsStyle="info" eventKey={question.id}>
                              <Panel.Heading>
                                  <Panel.Title toggle>
                                      {question.title}
                                  </Panel.Title>
                              </Panel.Heading>
                              <FAQQuestionContent
                                question={question}
                                queIndex={GetIndexWithId(props.category.questions, question.id)}
                                catIndex={props.catIndex}
                                upVote={props.upVote}
                                downVote={props.downVote}
                            />
                          </Panel>
                      </React.Fragment>) : ("")
            )}
        </PanelGroup>
    );
}