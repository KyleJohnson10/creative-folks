import React, { FunctionComponent, useEffect, useContext, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import { Container, Row, Col } from 'styled-bootstrap-grid';
import { AppContext } from '../../store/AppContext';

const HomepageContainer = styled(Container)`
  @media (min-width: 1536px) {
    max-width: 1536px;
  }

  @media (min-width: 1280px) {
    max-width: 1280px;
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

const ButtonLink = styled.p`
  text-decoration: underline;
  font-size: .875rem;
  line-height: 1.25rem;
  color: #3B82F6;
  cursor: pointer;
`

const CommentBox = styled.div`
  margin-top: 8px;
  padding: 32px;
  background-color: #f3f4f6;
`


export const Homepage: FunctionComponent<RouteComponentProps> = () => {
  const {
    state
  } = useContext(AppContext);
  const [openComments, setOpenComments] = useState<number[]>([]);

  useEffect(() => {
    console.log(state);
  }, [])

  const onButtonClick = (i: number) => {
    if (openComments.includes(i)) {
      setOpenComments(openComments.filter(val => val !== i));
    } else {
      setOpenComments([...openComments, i]);;
    }
  }

  return(
    <HomepageContainer>
      <h1>React Challenge</h1>
      <StyledRow>
        { state.posts.map((post, i) => (
          <StyledColumn md={4} key={i}>
            <StretchedColumn>
            <h2>{post.title}</h2>
            <p>The post id is {post.id}</p>
            <ButtonLink onClick={() => {
              onButtonClick(post.id)
            }}>{openComments.includes(post.id) ? 'Hide comments' : 'Show Comments'}</ButtonLink>
            {openComments.includes(post.id) && (
              <>
                { state.comments.map((comment, c) => (
                  <>
                  { comment.postId === post.id && (
                    <CommentBox>
                      <h3>This comment belongs to post id: {comment.postId}</h3>
                      <p style={{ padding: '24px 0' }}>{comment.body}</p>
                      <p className="p--sm">Comment ID: {comment.id} - Comment Post ID: {comment.postId}</p>
                    </CommentBox>
                  )}
                  </>
                ))}
              </>
            )}
            </StretchedColumn>
          </StyledColumn>
        ))}
      </StyledRow>
    </HomepageContainer>
  )
}