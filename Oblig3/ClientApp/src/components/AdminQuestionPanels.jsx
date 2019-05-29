import React from 'react';
import { PanelGroup, Panel, Label, Grid, Row, Col } from 'react-bootstrap';
import AdminQuestionContent from './AdminQuestionContent';
import { GetIndexWithId } from '../utils/Arrays';

/**
 * Creates the question panel groups for the admin feature.
 * @param {any} props contains a category, containing all the questions, a search string and the 
 * category index, aswell as the answerQuestionModalShow call handled in Admin.jsx.
 */
export default function AdminQuestionPanels(props) {
    return (
        <PanelGroup accordion id="AdminQuestionPanels">
            {props.category.questions.filter(question => {
                return question.title.toLowerCase().includes(props.searchString)
            }).map((question) =>
                <React.Fragment key={question.id}>
                    <Panel bsStyle={question.answer ? "success" : "warning"} eventKey={question.id}>
                        <Panel.Heading>
                            <Panel.Title toggle>
                                <Grid fluid>
                                    <Row>
                                        {!question.answer ?
                                            (
                                            <React.Fragment>
                                                <Col md={10} sm={10} xs={10} lg={10}>
                                                    {question.title}
                                                </Col>
                                                <Col md={2} sm={2} xs={2} lg={2}>
                                                    <Label bsSize="large" bsStyle="danger" className="pull-right">Ubesvart</Label>
                                                </Col>
                                            </React.Fragment>
                                            ) : (
                                            <React.Fragment>
                                                <Col md={12} sm={12} xs={12} lg={12}>
                                                    {question.title}
                                                </Col>
                                            </React.Fragment>
                                            )
                                        }
                                    </Row>
                                </Grid>
                            </Panel.Title>
                        </Panel.Heading>
                        <AdminQuestionContent
                            question={question}
                            catId={props.category.id}
                            queIndex={GetIndexWithId(props.category.questions, question.id)}
                            catIndex={props.catIndex}
                            answerQuestionModalShow={(catIndex, queIndex, question) => props.answerQuestionModalShow(catIndex, queIndex, question)}
                        />
                    </Panel>
                </React.Fragment>
            )}
        </PanelGroup>
    );
}