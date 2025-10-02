import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
// นำเข้า updateMember ด้วย
import { insertMember, updateMember } from '../../connectAPI/callMember';
// นำเข้า useLocation สำหรับรับ state และ useNavigate
import { useNavigate, useLocation } from 'react-router-dom';

const MemberForm = () => {
  // ใช้ useLocation เพื่อรับ state จากการนำทาง
  const location = useLocation();
  // ดึงข้อมูลสมาชิกจาก state ที่ส่งมา (ถ้ามี)
  const memberToEdit = location.state?.member;

  // State สำหรับเก็บข้อมูลในฟอร์ม
  // กำหนดค่าเริ่มต้นจาก memberToEdit หรือเป็นค่าว่าง
  const [memid, setMemid] = useState(memberToEdit?.memid || null);
  const [name, setName] = useState(memberToEdit?.name || '');
  const [age, setAge] = useState(memberToEdit?.age || '');
  const [password, setPassword] = useState(memberToEdit?.password || '');
  
  // State สำหรับแสดงข้อความตอบกลับจาก API
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // ฟังก์ชันที่ทำงานเมื่อกดปุ่ม Submit
  const handleSubmit = async (event) => {
    // ป้องกันไม่ให้หน้าเว็บรีเฟรชเอง
    event.preventDefault();

    const memberData = {
      name: name,
      age: age,
      password: password
    };

    try {
      let data;
      // ตรวจสอบว่าเป็น 'อัปเดต' หรือ 'เพิ่ม'
      if (memid) {
        // อัปเดตสมาชิกที่มีอยู่
        data = await updateMember(memid, memberData);
        console.log('Update Success:', data);
        setMessage(data.message || 'อัปเดตข้อมูลสำเร็จ!');
      } else {
        // เพิ่มสมาชิกใหม่
        data = await insertMember(memberData);
        console.log('Insert Success:', data);
        setMessage(data.message || 'เพิ่มข้อมูลสำเร็จ!');
      }

      // นำทางกลับไปยังหน้ารายการสมาชิกหลังจากสำเร็จ
      // ใช้ setTimeout เพื่อให้ผู้ใช้เห็นข้อความแจ้งเตือนก่อน
      setTimeout(() => {
        navigate('/member');
      }, 1000); // 1 วินาที
    } catch (err) {
      console.error('Error:', err);
      setMessage('เกิดข้อผิดพลาด: ' + (err.response?.data?.message || err.message));
    }
  };

  const formTitle = memid ? 'Edit Member:' : 'New Member:'; // หัวข้อแบบมีเงื่อนไข

  return (
    <React.Fragment>
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">{formTitle}</Card.Title> 
            </Card.Header>
            <Card.Body>
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formMemberName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={name} // 1. เชื่อม value เข้ากับ state
                    onChange={(e) => setName(e.target.value)} // 2. อัปเดต state เมื่อมีการพิมพ์
                    required // 3. บังคับกรอก
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMemberAge">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Age"
                    value={age} // 1. เชื่อม value เข้ากับ state
                    onChange={(e) => setAge(e.target.value)} // 2. อัปเดต state เมื่อมีการพิมพ์
                    required // 3. บังคับกรอก
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMemberPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Password"
                    value={password} // 1. เชื่อม value เข้ากับ state
                    onChange={(e) => setPassword(e.target.value)} // 2. อัปเดต state เมื่อมีการพิมพ์
                    required // 3. บังคับกรอก
                    
                  />
                  <Form.Text className="text-muted">
                    We&apos;ll never share your email with anyone else. 
                  </Form.Text>
                </Form.Group>

                {/* แสดงข้อความตอบกลับ */}
                {message && <p className={memid ? 'text-success' : 'text-primary'}>{message}</p>}

                <Button variant="primary" type="submit">
                  {memid ? 'Update' : 'Submit'} {/*  ข้อความปุ่มแบบมีเงื่อนไข */}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default MemberForm; // เปลี่ยนชื่อ Component เป็น MemberForm เพื่อความชัดเจน