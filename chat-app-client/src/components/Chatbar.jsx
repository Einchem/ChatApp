import React, { useContext, useEffect } from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { AppContext } from '../context/appContext'
import { addNotifications, resetNotifications } from '../features/userSlice'
import '../css/chatBar.css'
import { BsCircleFill } from 'react-icons/bs';


const Chatbar = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const { socket, setMembers, members, setcurrentRooms,
    setRooms, rooms, setPrivateMemberMsg, privateMemberMsg,
    currentRooms } = useContext(AppContext)

  function joinRoom(room, isPublic = true) {
    if (!user) {
      return alert("please login")
    }
    socket.emit('join-room', room, currentRooms)
    setcurrentRooms(room)
    if (isPublic) {
      setPrivateMemberMsg(null)
    }
    //dispatch notification
    dispatch(resetNotifications(room))
  }
  socket.off('notifications').on('notifications', (room) => {
    if (currentRooms !== room) dispatch(addNotifications(room))

  })


  useEffect(() => {
    setcurrentRooms('general')
    getRooms()
    socket.emit('join-room', 'general')
    socket.emit('new-user')

  }, [])
  socket.off('new-user').on('new-user', (payload) => {
    setMembers(payload)
  })

  function getRooms() {
    fetch('http://localhost:5001/rooms')
      .then((res) => res.json())
      .then((data) => setRooms(data))
  }

  function orderIds(id1, id2) {
    if (id1 > id2) {
      return id1 + "-" + id2
    } else {
      return id2 + "-" + id1
    }
  }
  function handlePrivateMemberMsg(member) {
    setPrivateMemberMsg(member)
    const roomId = orderIds(user._id, member._id)
    joinRoom(roomId, false)
  }
  if (!user) {
    return <></>
  }
  return (
    <>
      <h2>Available Groups</h2>
      <ListGroup>
        {rooms.map((room, index) => (
          <ListGroup.Item key={index} onClick={() => joinRoom(room)}
            active={room == currentRooms}
            style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
          >{room}{currentRooms !== room &&
            <span className='badge rounded-pill bg-primary'>
              {user.newMessages[room]}</span>}
          </ListGroup.Item>
        ))}

      </ListGroup>
      <h2>Members</h2>
      <ListGroup>
        {members.map((member, index) => (<ListGroup.Item key={index} style={{
          cursor: "pointer"
        }} active={privateMemberMsg?._id === member?._id} onClick={() => handlePrivateMemberMsg(member)}
          disabled={member._id === user._id}>
          <Row>
            <Col xs={2} className="member-status">
              <img src={member.picture} className="member-status-img" />
              {member.status == "online" ?
                <BsCircleFill className='sidebar-online-status'>

                </BsCircleFill>
                : <BsCircleFill className='sidebar-offline-status'>
                </BsCircleFill>}
            </Col>
            <Col xs={9}>
              {member.name}
              {member._id === user?._id && " (you)"}
              {member.status == "offline" && " (offline)"}
            </Col>
            <Col xs={1}>
              <span
                className='badge rounded-pill bg-primary'>
                {user.newMessages[orderIds(member._id, user._id)]}
              </span>
            </Col>
          </Row>
        </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  )
}


export default Chatbar
