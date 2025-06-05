# ✅ Manual Testing Report — Blog App

> Project: Fullstack Blog Application using Vite + React + Express + MongoDB  
> Author: Shubham Uday  
> Date: [Insert Date]

---

## 🔐 User Authentication

| Test | Expected Result | Status |
|------|------------------|--------|
| Register a new user | User is created and redirected to login | ✅ Passed |
| Login with valid credentials | Redirected to dashboard / profile | ✅ Passed |
| Login with invalid credentials | Error message is shown | ✅ Passed |
| Logout | User session is cleared and redirected | ✅ Passed |

---

## ✍️ Blog Functionality

| Test | Expected Result | Status |
|------|------------------|--------|
| Create a blog (logged-in) | Blog is saved and listed | ✅ Passed |
| Edit blog (user only) | Blog is updated | ✅ Passed |
| Delete blog (user only) | Blog is deleted | ✅ Passed |
| View blog detail (public) | Full content is shown | ✅ Passed |

---

## 🌐 Public Pages

| Test | Expected Result | Status |
|------|------------------|--------|
| View all blogs | Paginated list of blogs | ✅ Passed |
| Navigate pages | Blogs change on page switch | ✅ Passed |
| View blog detail page | Shows content and author info | ✅ Passed |

---

## 📱 Responsive Design

| Screen Size | Tested On | Status |
|-------------|-----------|--------|
| Desktop | Chrome | ✅ Passed |
| Tablet | Chrome DevTools | ✅ Passed |
| Mobile | Chrome DevTools | ✅ Passed |

---

## 🧪 Extra Debug Notes

- Console logs used to verify data flow
- Network tab checked for correct API calls
- Form validation manually tested

---

## 🏁 Summary

All critical user flows were tested manually and passed. The application behaves as expected across devices and routes.

---