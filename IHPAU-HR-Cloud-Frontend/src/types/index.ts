export type Role = 'SUPER_ADMIN'|'HR_ADMIN'|'HR_OFFICER'|'DEPARTMENT_MANAGER'|'EMPLOYEE'|'RECRUITER'|'TRAINING_MANAGER'|'PERFORMANCE_MANAGER'|'FINANCE';
export type Permission = string;
export interface User {id:string; name:string; email:string; role:Role; organizationId:string; organizationName:string; department?:string; employeeId?:string; status:'ACTIVE'|'INACTIVE'; lastLogin:string;}
export interface Employee {id:string; firstName:string; lastName:string; email:string; phone:string; department:string; position:string; location:string; manager:string; status:'ACTIVE'|'ON_LEAVE'|'INACTIVE'; joinDate:string; employmentType:'FULL_TIME'|'PART_TIME'|'CONTRACT'; avatar?:string; attendanceRate:number; leaveBalance:number; goalProgress:number;}
export interface Department {id:string; name:string; code:string; manager:string; employees:number; parent?:string; status:'ACTIVE'|'INACTIVE';}
export interface Job {id:string; title:string; department:string; location:string; openings:number; applicants:number; closingDate:string; status:'OPEN'|'CLOSED'|'DRAFT';}
export interface Candidate {id:string; name:string; email:string; location:string; job:string; stage:'Applied'|'Screening'|'Shortlisted'|'Interview'|'Offer'|'Hired'; applied:string;}
export interface LeaveRequest {id:string; employee:string; type:string; start:string; end:string; days:number; status:'PENDING'|'APPROVED'|'REJECTED'|'CANCELLED'; reason:string;}
export interface Notification {id:string; title:string; body:string; category:string; time:string; unread:boolean;}
export interface Course {id:string;name:string;category:string;duration:string;enrolled:number;completion:number;mandatory:boolean;status:'ACTIVE'|'INACTIVE'}
export interface AttendanceRecord {id:string;employee:string;date:string;checkIn:string;checkOut:string;status:string}
