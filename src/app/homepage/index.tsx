import React, { FunctionComponent, useEffect, useContext } from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import { Container, Row, Col } from 'styled-bootstrap-grid';
import { AppContext } from '../../store/AppContext';

const HomepageContainer = styled(Container)`
  @media (min-width: 1536px) {
    max-width: 1536px;
  }
`

const StyledRow = styled(Row)`
  margin-right: 0;
  margin-top: 32px;
  margin-left: 0;
`

const StyledColumn = styled(Col)`
  padding-left: 0;
  padding-right: 0;
`

const StretchedColumn = styled.div`
  padding: 0.5rem 2rem;
`


export const Homepage: FunctionComponent<RouteComponentProps> = () => {
  const {
    state
  } = useContext(AppContext);

  useEffect(() => {
    console.log(state);
  }, [])

  return(
    <HomepageContainer>
      <h1>React Challenge</h1>
      <StyledRow>
        { state.posts.map((post, i) => (
          <StyledColumn md={4} key={i}>
            <StretchedColumn>
            <h2>{post.title}</h2>
            <p>The post id is {post.id}</p>
            </StretchedColumn>
          </StyledColumn>
        ))}
      </StyledRow>
    </HomepageContainer>
  )
}