import { Model, DataTypes, BelongsToGetAssociationMixin } from 'sequelize';
import appSequelize from '../app-sequelize'
import CourseWWTopicQuestion from './course-ww-topic-question';
import User from './user';
import StudentGrade from './student-grade';

export default class StudentWorkbook extends Model {
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.
    public studentGradeId!: number;
    public userId!: number;
    public courseWWTopicQuestionId!: number;
    public randomSeed!: number;
    // This is a jsonb field so it could be any (from db)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public submitted!: any;
    public result!: number
    public time!: Date;

    public getStudentGrade!: BelongsToGetAssociationMixin<StudentGrade>;
    public getUser!: BelongsToGetAssociationMixin<User>;
    public getCourseWWTopicQuestion!: BelongsToGetAssociationMixin<CourseWWTopicQuestion>;

    public studentGrade!: StudentGrade;
    public user!: User;
    public courseWWTopicQuestion!: CourseWWTopicQuestion;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

StudentWorkbook.init({
    id: {
        field: 'student_workbook_id',
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    studentGradeId: {
        field: 'student_grade_id',
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        field: 'user_id',
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    courseWWTopicQuestionId: {
        field: 'course_topic_question_id',
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    randomSeed: {
        field: 'student_workbook_random_seed',
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    submitted: {
        field: 'student_workbook_submitted',
        type: DataTypes.JSONB,
        allowNull: false,
    },
    result: {
        field: 'student_workbook_result',
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    time: {
        field: 'student_workbook_time',
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'student_workbook',
    sequelize: appSequelize, // this bit is important
});

StudentWorkbook.belongsTo(StudentGrade, {
    foreignKey: 'studentGradeId',
    targetKey: 'id',
    as: 'studentGrade'
});

StudentWorkbook.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: 'user'
});

StudentWorkbook.belongsTo(CourseWWTopicQuestion, {
    foreignKey: 'courseWWTopicQuestionId',
    targetKey: 'id',
    as: 'courseWWTopicQuestion'
});
