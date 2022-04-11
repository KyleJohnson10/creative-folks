import React, {
  FunctionComponent,
  useEffect,
  useContext,
  useState,
} from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import styled from 'styled-components';
import { Container, Row, Col } from 'styled-bootstrap-grid';
import { AppContext } from '../../store/AppContext';
import { AddCommentForm } from '../../components/AddCommentForm';

export const BodyContainer = styled(Container)`
  @media (min-width: 1280px) {
    max-width: 1280px;
  }

  @media (min-width: 1536px) {
    max-width: 1536px;
  }
`;

export const StyledRow = styled(Row)`
  margin-right: 0;
  margin-top: 32px;
  margin-left: 0;
`;

const StyledColumn = styled(Col)`
  padding-left: 0;
  padding-right: 0;
`;

const StretchedColumn = styled.div`
  padding: 0.5rem 2rem;
`;

const ButtonLink = styled.p`
  text-decoration: underline;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #3b82f6;
  cursor: pointer;
`;

const CommentBox = styled.div`
  margin-top: 8px;
  padding: 32px;
  background-color: #f3f4f6;
  cursor: pointer;
`;

export const Homepage: FunctionComponent<RouteComponentProps> = () => {
  const {
    state: { comments, posts },
  } = useContext(AppContext);
  const [openComments, setOpenComments] = useState<number[]>([]);

  const onButtonClick = (i: number) => {
    if (openComments.includes(i)) {
      setOpenComments(openComments.filter(val => val !== i));
    } else {
      setOpenComments([...openComments, i]);
    }
  };

  const postHasValidComments = (postId: number): boolean => {
    let hasComments = false;
    comments?.forEach(comment => {
      if (comment.postId === postId) {
        hasComments = true;
      }
    });
    return hasComments;
  };

  return (
    <BodyContainer>
      <h1>React Challenge</h1>
      <StyledRow>
        {posts?.map((post, i) => (
          <StyledColumn md={4} key={i}>
            <StretchedColumn>
              <h2>{post.title}</h2>
              <p>The post id is {post.id}</p>
              <ButtonLink
                onClick={() => {
                  onButtonClick(post.id);
                }}>
                {openComments.includes(post.id)
                  ? 'Hide comments'
                  : 'Show Comments'}
              </ButtonLink>
              {openComments.includes(post.id) && (
                <>
                  {comments?.map(comment => (
                    <>
                      {comment.postId === post.id && (
                          <CommentBox onClick={() => {
                            navigate('/comment/' + post.id)
                          }}>
                            <h3>
                              This comment belongs to post id: {comment.postId}
                            </h3>
                            <p style={{ padding: '24px 0' }}>{comment.body}</p>
                            <p className="p--sm">
                              Comment ID: {comment.id} - Comment Post ID:{' '}
                              {comment.postId}
                            </p>
                          </CommentBox>
                      )}
                    </>
                  ))}
                  {postHasValidComments(post.id) === false && (
                    <p style={{ marginBottom: '16px', marginTop: '8px' }} className="p--xl">
                      There are no comments to display
                    </p>
                  )}
                  <AddCommentForm postId={post.id} />
                </>
              )}
            </StretchedColumn>
          </StyledColumn>
        ))}
      </StyledRow>
    </BodyContainer>
  );
};
