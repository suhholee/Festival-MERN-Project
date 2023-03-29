// Bootstrap imports
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Error from '../common/Error'

const EditComment = (_id, handleSubmitEdit, handleChangeEdit, editedComment, editError) => {

  return (
    <>
      <Container>
        <Col as='form' onSubmit={(e) => handleSubmitEdit(e, _id)}>
          <Row>
            <input type='text' name='edit-comment' placeholder='Edit Comment' onChange={handleChangeEdit} value={editedComment}/>
            <button>Save</button>
            {editError && <Error error={editError}/>}
          </Row>
        </Col>
      </Container>
    </>
  )
}

export default EditComment