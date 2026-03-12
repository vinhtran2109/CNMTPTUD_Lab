const SubjectModel = require("../models");
const Controller = {};

// method get sẽ thực hiện lấy tất cả các subject từ table Subject
Controller.get = async (req, res) => {
  /**
   * Bước 1: Thực hiện lấy tất cả các subject từ table Subject bằng method getSubjects của SubjectModel mà ta đã tạo
   * Bước 2: Trả về thông tin của các subject đã lấy
   */
  try {
    const subjects = await SubjectModel.getSubjects();
    return res.status(200).json(subjects);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting subjects");
  }
};

// method getOne sẽ thực hiện lấy thông tin của subject dựa vào id
Controller.getOne = async (req, res) => {
  /**
   * Bước 1: Lấy id của subject từ param của request
   * Bước 2: Thực hiện lấy thông tin của subject dựa vào id bằng method getOneSubject của SubjectModel mà ta đã tạo
   * Bước 3: Nếu subject tồn tại thì trả về thông tin của subject
   * Bước 4: Xử lý lỗi nếu có
   */
  try {
    const { id } = req.params;
    const subject = await SubjectModel.getOneSubject(id);
    if (subject) {
      return res.status(200).json(subject);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting subject");
  }
};

module.exports = Controller;