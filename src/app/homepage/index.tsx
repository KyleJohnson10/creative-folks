import React, {
  FunctionComponent,
  useEffect,
  useContext,
  useState,
} from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import { Container, Row, Col } from 'styled-bootstrap-grid';
import { AppContext } from '../../store/AppContext';
import { isNull } from 'cypress/types/lodash';

const HomepageContainer = styled(Container)`
  @media (min-width: 1280px) {
    max-width: 1280px;
  }

  @media (min-width: 1536px) {
    max-width: 1536px;
  }
`;

const StyledRow = styled(Row)`
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
`;

const FormContainer = styled.div`
  padding-top: 32px;
  width: 100%;
`;

export const Homepage: FunctionComponent<RouteComponentProps> = () => {
  const {
    state: { comments, posts },
    updateState,
  } = useContext(AppContext);
  const [openComments, setOpenComments] = useState<number[]>([]);

  useEffect(() => {
    console.log(posts);
    console.log(comments);
  }, []);

  const onButtonClick = (i: number) => {
    if (openComments.includes(i)) {
      setOpenComments(openComments.filter(val => val !== i));
    } else {
      setOpenComments([...openComments, i]);
    }
  };

  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>, postId: number): void => {
    e.preventDefault();
    console.log(e);
    console.log(postId);
    //updateState({
    //  comments: [
    //    {
    //      body: e.target[1].value,
    //      id: e.target[0].value,
    //      postId: 3,
    //    },
    //  ],
    //});
  };

  return (
    <HomepageContainer>
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
                  {comments?.map((comment, c) => (
                    <>
                      {comment.postId === post.id && (
                        <CommentBox>
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
                  <FormContainer>
                    <p style={{ marginBottom: '16px' }} className="p--xl">
                      Add Comment
                    </p>
                    <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                      handleSubmitComment(e, post.id)}
                    }>
                      <input
                        style={{ marginBottom: '16px' }}
                        type="text"
                        placeholder="id"
                      />
                      <textarea placeholder="Comment body..." />
                      <button type="submit">Add Comment</button>
                    </form>
                  </FormContainer>
                </>
              )}
            </StretchedColumn>
          </StyledColumn>
        ))}
      </StyledRow>
    </HomepageContainer>
  );
};
