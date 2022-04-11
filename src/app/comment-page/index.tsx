import { FunctionComponent, useContext } from 'react';
import { RouteComponentProps } from '@reach/router';
import { AppContext } from '../../store/AppContext';
import { Col } from 'styled-bootstrap-grid';
import { BodyContainer, StyledRow } from '../homepage';

interface ICommentPage extends RouteComponentProps {
  route?: string;
}

export const CommentPage: FunctionComponent<ICommentPage> = (
  props: ICommentPage,
) => {
  const {
    state: { comments },
  } = useContext(AppContext);

  return (
    <BodyContainer>
      <h1>See your comment in more detail...</h1>
      <StyledRow>
        <Col style={{ padding: '0' }}>
          {comments?.map(comment => (
            <>
              {props.route && comment.id === parseInt(props.route) && (
                <>
                  <h2 className="mb--16">
                    This comment belongs to post id: {comment.postId}
                  </h2>
                  <p className="mb--16 p--xl">{comment.body}</p>
                  <p className="mb--16">
                    Comment ID: {comment.id} - Comment Post ID: {comment.postId}
                  </p>
                </>
              )}
            </>
          ))}
        </Col>
      </StyledRow>
    </BodyContainer>
  );
};
