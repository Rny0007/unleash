/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */
import type { ExecutiveSummarySchemaFlags } from './executiveSummarySchemaFlags';
import type { ExecutiveSummarySchemaFlagTrendsItem } from './executiveSummarySchemaFlagTrendsItem';
import type { ExecutiveSummarySchemaMetricsSummaryTrendsItem } from './executiveSummarySchemaMetricsSummaryTrendsItem';
import type { ExecutiveSummarySchemaProjectFlagTrendsItem } from './executiveSummarySchemaProjectFlagTrendsItem';
import type { ExecutiveSummarySchemaUsers } from './executiveSummarySchemaUsers';
import type { ExecutiveSummarySchemaUserTrendsItem } from './executiveSummarySchemaUserTrendsItem';

/**
 * Executive summary of Unleash usage
 */
export interface ExecutiveSummarySchema {
    /** High level flag count statistics */
    flags: ExecutiveSummarySchemaFlags;
    /** How number of flags changed over time */
    flagTrends: ExecutiveSummarySchemaFlagTrendsItem[];
    /** How metrics data per project changed over time */
    metricsSummaryTrends: ExecutiveSummarySchemaMetricsSummaryTrendsItem[];
    /** How number of flags per project changed over time */
    projectFlagTrends: ExecutiveSummarySchemaProjectFlagTrendsItem[];
    /** High level user count statistics */
    users: ExecutiveSummarySchemaUsers;
    /** How number of users changed over time */
    userTrends: ExecutiveSummarySchemaUserTrendsItem[];
}
