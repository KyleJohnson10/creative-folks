import { FunctionComponent, useContext } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import { AppContext } from '../../store/AppContext';
import { Col } from 'styled-bootstrap-grid';
import { BodyContainer, StyledRow } from '../homepage';
import styled from 'styled-components';

const PostContainer = styled.div`
  display: flex;
`;

const SinglePost = styled.div`
  background-color: #f3f4f6;
  padding: 32px;
  margin 0 32px;

  &:first-of-type {
    margin-left: 0;
  }
`;

interface IPostPage extends RouteComponentProps {
  route?: string;
}

export const PostPage: FunctionComponent<IPostPage> = (props: IPostPage) => {
  const {
    state: { comments },
  } = useContext(AppContext);

  return (
    <BodyContainer>
      <h1>See all from Post {props.route}</h1>
      <button
        style={{ marginTop: '32px' }}
        onClick={() => {
          navigate('/');
        }}>
        Back to home
      </button>
      <StyledRow>
        <Col style={{ padding: '0' }}>
          <PostContainer>
            {comments?.map(comment => (
              <>
                {props.route && comment.postId === parseInt(props.route) && (
                  <SinglePost>
                    <div>
                      <h2 className="mb--16">
                        This comment belongs to post id: {comment.postId}
                      </h2>
                      <p className="mb--16 p--xl">{comment.body}</p>
                      <p className="mb--16">
                        Comment ID: {comment.id} - Comment Post ID:{' '}
                        {comment.postId}
                      </p>
                    </div>
                  </SinglePost>
                )}
              </>
            ))}
          </PostContainer>
        </Col>
      </StyledRow>
    </BodyContainer>
  );
};
