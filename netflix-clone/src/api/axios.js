import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDg0OTVlNDcxYTBjNTc1MDJkMjRlN2RmYjhmNDE2NSIsIm5iZiI6MTc2NzA4Mjk5Ny4wNiwic3ViIjoiNjk1MzhiZjViZjRhM2ZiZTgzNGFkOWE1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.dtp_Rlnpp6Pqq97PROEoZDPtIvXadPVdPzf4SstTbWQ",
    "Content-Type": "application/json;charset=utf-8",
  },
});

export default instance;
