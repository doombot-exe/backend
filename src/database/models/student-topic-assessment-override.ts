import { Model, DataTypes } from 'sequelize';
import appSequelize from '../app-sequelize';
import StudentTopicAssessmentInfo from './student-topic-assessment-info';
import TopicAssessmentInfo from './topic-assessment-info';

export interface StudentTopicAssessmentOverrideInterface {
    id: number;
    topicAssessmentInfoId: number;
    studentTopicAssessmentInfoId: number;
    userId: number;
    duration: number | null;
    maxGradedAttemptsPerVersion: number | null;
    maxVersions: number | null;
    versionDelay: number | null;
    active: boolean;
}

export default class StudentTopicAssessmentOverride extends Model implements StudentTopicAssessmentOverrideInterface {
    public id!: number;
    // public courseTopicContentId!: number;
    public topicAssessmentInfoId!: number;
    public studentTopicAssessmentInfoId!: number;
    public userId!: number;
    public duration!: number | null;
    public maxGradedAttemptsPerVersion!: number | null;
    public maxVersions!: number | null;
    public versionDelay!: number | null;
    public active!: boolean;

    // public getCurriculumTopicContent!: BelongsToGetAssociationMixin<CurriculumTopicContent>;

    // public readonly curriculumTopicContent!: CurriculumTopicContent;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static constraints = {
    }

    static createAssociations(): void {
        // This is a hack to add the associations later to avoid cyclic dependencies
        /* eslint-disable @typescript-eslint/no-use-before-define */
        StudentTopicAssessmentOverride.belongsTo(TopicAssessmentInfo, {
            foreignKey: 'topicAssessmentInfoId',
            targetKey: 'id',
            as: 'topicAssessmentInfo'
        });

        StudentTopicAssessmentOverride.belongsTo(StudentTopicAssessmentInfo, {
            foreignKey: 'studentTopicAssessmentInfoId',
            targetKey: 'id',
            as: 'studentTopicAssessmentInfo'
        });

        StudentTopicAssessmentOverride.belongsTo(User, {
            foreignKey: 'userId',
            targetKey: 'id',
            as: 'user'
        });

        // CourseTopicContent.hasMany(CourseWWTopicQuestion, {
        //     foreignKey: 'courseTopicContentId',
        //     sourceKey: 'id',
        //     as: 'questions'
        // });
        /* eslint-enable @typescript-eslint/no-use-before-define */
    }
}

StudentTopicAssessmentOverride.init({
    id: {
        field: 'student_topic_assessment_override_id',
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    topicAssessmentInfoId: {
        field: 'topic_assessment_info_id',
        type: DataTypes.INTEGER,
        allowNull: false
    },
    studentTopicAssessmentInfoId: {
        field: 'student_topic_assessment_info_id',
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        field: 'user_id',
        type: DataTypes.INTEGER,
        allowNull: false
    },
    duration: {
        field: 'student_topic_assessment_override_duration',
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    maxGradedAttemptsPerVersion: {
        field: 'student_topic_assessment_override_max_graded_attempts_per_version',
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    maxVersions: {
        field: 'student_topic_assessment_override_max_versions',
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    versionDelay: {
        field: 'student_topic_assessment_override_version_delay',
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    active: {
        field: 'student_topic_assessment_override_active',
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    tableName: 'student_topic_assessment_override',
    sequelize: appSequelize, // this bit is important
});

import User from './user';
