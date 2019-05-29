import React from 'react';
import { Panel, Grid, Row, Col, Button, Badge } from 'react-bootstrap';

/**
 * Representing the specific content in the question panel bodys in the admin features.
 * @param {any} props contains the question, category index and question index, aswell as 
 * the answerQuestionModalShow call handled in Admin.jsx.
 */
export default function AdminQuestionContent(props)  {
    return (
        <Panel.Body collapsible>
            {props.question.answer ?
                (
                    <React.Fragment>
                        <Grid fluid>
                            <Row>
                                <Col md={2} sm={2} xs={2} lg={2}>
                                    <h4>CatID/ QueID</h4>
                                </Col>
                                <Col md={8} sm={8} xs={8} lg={8}>
                                    <h4>Svar</h4>
                                </Col>
                                <Col md={2} sm={2} xs={2} lg={2}>
                                    <h4>Rating</h4>
                                </Col>
                            </Row>
                        </Grid>
                        <Grid fluid>
                            <Row>
                                <Col md={2} sm={2} xs={2} lg={2}>
                                    {props.catId}/{props.question.id}
                                </Col>
                                <Col md={8} sm={8} xs={8} lg={8}>
                                    {props.question.answer}
                                </Col>
                                <Col md={2} sm={2} xs={2} lg={2}>
                                    <Badge className="m-2">{props.question.rating}</Badge>
                                </Col>
                            </Row>
                        </Grid>
                    </React.Fragment>
                ) :
                (<React.Fragment>
                    <Grid fluid>
                        <Row>
                            <Col md={2} sm={2} xs={2} lg={2}>
                                <Grid fluid>
                                    <Row>
                                        <Col>
                                            <h4>CatID/ QueID</h4>
                                        </Col>
                                    </Row>
                                </Grid>
                                <Grid fluid>
                                    <Row>
                                        <Col>
                                            {props.catId}/{props.question.id}
                                        </Col>
                                    </Row>
                                </Grid>
                            </Col>
                            <Col md={10} sm={10} xs={10} lg={10}>
                                <Button bsStyle="danger" bsSize="large" block onClick={() => props.answerQuestionModalShow(props.catIndex, props.queIndex, props.question)}>
                                    Svar
                                </Button>
                            </Col>
                        </Row>
                    </Grid>
                </React.Fragment>
                )
            }
        </Panel.Body>
    );
}
