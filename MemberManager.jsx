import React from "react";
import { Button } from "react-bootstrap";
import { deleteMember } from "../../connectAPI/callMember";
import { useNavigate } from "react-router-dom"; 

function MemberManager({ member, onRefresh }) {
  //  สร้าง instance ของ useNavigate
  const navigate = useNavigate(); 
  

  const handleDelete = async () => {
    if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบสมาชิก: ${member.name}?`)) {
        try {
            await deleteMember(member.memid);
            alert('ลบสมาชิกสำเร็จ');
            onRefresh(); // เรียกฟังก์ชันเพื่อรีเฟรชข้อมูล
        } catch (err) {
            console.error('Error deleting member:', err);
            alert('เกิดข้อผิดพลาดในการลบสมาชิก');
        } 
    }
  };


  const handleEdit = () => {
    // นำทางไปยังหน้า '/member/edit' และส่งข้อมูลสมาชิกเป็น state
    // คุณอาจต้องกำหนด Route ใน App.js สำหรับพาธนี้ด้วย
    navigate(`/member/edit/${member.memid}`, { state: { member } });
  };


    return(
            <div className="text-center">
      <Button 
        variant="warning" 
        size="sm" 
        className="me-2"
        onClick={handleEdit} //  เรียกใช้ handleEdit ที่ปรับปรุงแล้ว
      >
        <i className="feather icon-edit"></i> แก้ไข
      </Button>
      <Button 
        variant="danger" 
        size="sm"
        onClick={handleDelete}
      >
        <i className="feather icon-trash-2"></i> ลบ
      </Button>
    </div>
    );
}

export default MemberManager;
