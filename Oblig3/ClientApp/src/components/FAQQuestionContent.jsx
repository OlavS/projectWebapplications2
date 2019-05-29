import React from 'react';
import { Panel, Grid, Row, Col, ButtonGroup, Glyphicon, Badge } from 'react-bootstrap';
import DisableButton from './DisableButton';

/**
 * Representing the specific content in the question panel bodys in the faq feature.
 * @param {any} props contains the question, category index and question index, 
 * aswell as the upVote and downVote feature handled in FAQ.jsx.
 */
export default function FAQQuestionContent(props) {
    return (
        <React.Fragment>
            {props.question.answer ?
                (
                    <Panel.Body collapsible>
                        <Grid fluid>
                            <Row>
                                <Col md={10} sm={10} xs={10} lg={10}>
                                    <h4>Svar</h4>
                                </Col>
                                <Col md={2} sm={2} xs={2} lg={2}>
                                    <h4>Rating</h4>
                                </Col>
                            </Row>
                        </Grid>
                        <Grid fluid>
                            <Row >
                                <Col md={10} sm={10} xs={10} lg={10}>
                                    {props.question.answer}
                                </Col>
                                <Col md={2} sm={2} xs={2} lg={2}>
                                    <Badge>{props.question.rating}</Badge>
                                    <ButtonGroup vertical className="pull-right">
                                        <DisableButton
                                            bsStyle={"primary"}
                                            bsSize={"xsmall"}
                                            content={<Glyphicon glyph="thumbs-up" />}
                                            onClick={() => props.upVote(props.catIndex, props.queIndex, props.question.id)}
                                        />
                                        <DisableButton
                                            bsStyle={"danger"}
                                            bsSize={"xsmall"}
                                            content={<Glyphicon glyph="thumbs-down" />}
                                            onClick={() => props.downVote(props.catIndex, props.queIndex, props.question.id)}
                                        />
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </Grid>
                    </Panel.Body>
                ) : ("")
            }
        </React.Fragment>
    );
}