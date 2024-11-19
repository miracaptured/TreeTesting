import { TaskInfo } from "./task-info";

export class AnalyticsReport {
	surveyId: string;
    surveyName: string;
	dateCreated: string;
	totalResponses: number;
}

export class AnalyticsReportExtended extends AnalyticsReport {
	averageTime: number;
	minTime: number;
	maxTime: number;
	tasksInfo: TaskInfo[]
}