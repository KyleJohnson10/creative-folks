import React, { FunctionComponent, useState, useContext } from 'react';
import styled from 'styled-components';
import { ICommentFormValues } from '../../store/interfaces';
import { AppContext } from '../../store/AppContext';

const FormContainer = styled.div`
  padding-top: 32px;
  width: 100%;
`;

interface IAddCommentForm {
  postId: number;
}

export const AddCommentForm: FunctionComponent<IAddCommentForm> = (
  props: IAddCommentForm,
) => {
  const { postId } = props;

  const {
    updateState,
    state: { comments },
  } = useContext(AppContext);

  const [error, setError] = useState<string>('');

  const [formValues, setFormValues] = useState<ICommentFormValues>({
    id: '',
    body: '',
  });

  const idIsUnique = (id: number | string): boolean => {
    let isUnique = true;
    comments?.forEach(comment => {
      if (comment.id === id) {
        isUnique = false;
      }
    });
    return isUnique;
  };

  const handleInputChange = (e: any): void => {
    e.preventDefault();
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (comments && idIsUnique(typeof formValues.id == "string" ? parseInt(formValues.id) : formValues.id) === true) {
      setError('');
      updateState({
        comments: [
          ...comments,
          {
            body: formValues.body,
            id: formValues.id,
            postId: postId,
          },
        ],
      });
      setFormValues({
        id: '',
        body: '',
      });
    } else {
      // show error
      setError(
        'A comment with ID ' +
          formValues.id +
          ' already exists in the database',
      );
    }
  };

  return (
    <FormContainer>
      <p style={{ marginBottom: '16px' }} className="p--xl">
        Add Comment
      </p>
      <form onSubmit={handleSubmitComment}>
        <input
          style={error ? { marginBottom: '8px' } : { marginBottom: '16px' }}
          name="id"
          value={formValues.id}
          onChange={handleInputChange}
          type="text"
          placeholder="id"
        />
        {error && (
          <p style={{ marginBottom: '16px' }} className="errorText p--sm">
            {error}
          </p>
        )}
        <textarea
          value={formValues.body}
          name="body"
          onChange={handleInputChange}
          placeholder="Comment body..."
        />
        <button type="submit">Add Comment</button>
      </form>
    </FormContainer>
  );
};
