import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MemberManager from './MemberManager';
import { getMembers } from '../../connectAPI/callMember'; // **อาจจะต้องแก้ Path เป็น ../../ นะครับ**

function MemberList() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const data = await getMembers();
      // เพิ่ม console.log เพื่อดูข้อมูลที่ได้รับจริง ๆ
      console.log('Data from API:', data);
      setMembers(data);
    } catch (err) {
      console.error('โหลดข้อมูลล้มเหลว:', err);
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Member List</Card.Title>
              <span className="d-block m-t-5">รายชื่อสมาชิกทั้งหมด</span>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                {/* 1. แก้ไขหัวตารางให้ตรงกับข้อมูลที่มี */}
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Password</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* 2. แก้ไขการแสดงผลให้ใช้ Field ที่ถูกต้องจากฐานข้อมูล */}
                  {members.length > 0 ? (
                  members.map((member) => (
                    <tr key={member.memid}>
                      <th scope="row">{member.memid}</th>
                      <td>{member.name}</td>
                      <td>{member.age}</td>
                      <td>{member.password}</td>
                      <td>                          
                          <MemberManager 
                            member={member} 
                            onRefresh={fetchMembers} 
                          />
                      </td>
                    </tr>
                  ))
                 ) : (
                    <tr>
                        <td colSpan="4" className="text-center">
                        ไม่มีข้อมูลสมาชิก
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default MemberList;