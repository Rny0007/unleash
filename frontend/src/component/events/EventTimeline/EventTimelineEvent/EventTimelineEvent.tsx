import type { EventSchemaType } from 'openapi';
import { styled } from '@mui/material';
import { HtmlTooltip } from 'component/common/HtmlTooltip/HtmlTooltip';
import { EventTimelineEventTooltip } from './EventTimelineEventTooltip/EventTimelineEventTooltip';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import SegmentsIcon from '@mui/icons-material/DonutLargeOutlined';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import type { TimelineEvent, TimelineEventGroup } from '../EventTimeline';
import type { ISignal } from 'interfaces/signal';

type DefaultEventVariant = 'secondary';
type CustomEventVariant = 'success' | 'neutral';
type EventVariant = DefaultEventVariant | CustomEventVariant;

const StyledEvent = styled('div', {
    shouldForwardProp: (prop) => prop !== 'position',
})<{ position: string }>(({ position }) => ({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    left: position,
    transform: 'translateX(-50%)',
    zIndex: 1,
}));

const StyledEventCircle = styled('div', {
    shouldForwardProp: (prop) => prop !== 'variant',
})<{ variant: EventVariant }>(({ theme, variant }) => ({
    height: theme.spacing(3),
    width: theme.spacing(3),
    borderRadius: '50%',
    backgroundColor: theme.palette[variant].light,
    border: `1px solid ${theme.palette[variant].main}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s',
    '& svg': {
        color: theme.palette[variant].main,
        height: theme.spacing(2.5),
        width: theme.spacing(2.5),
    },
    '&:hover': {
        transform: 'scale(1.5)',
    },
}));

const getEventIcon = (type: EventSchemaType) => {
    if (type === 'feature-environment-enabled') {
        return <ToggleOnIcon />;
    }
    if (type === 'feature-environment-disabled') {
        return <ToggleOffIcon />;
    }
    if (type.startsWith('strategy-') || type.startsWith('feature-strategy-')) {
        return <ExtensionOutlinedIcon />;
    }
    if (type.startsWith('feature-')) {
        return <FlagOutlinedIcon />;
    }
    if (type.startsWith('segment-')) {
        return <SegmentsIcon />;
    }

    return <QuestionMarkIcon />;
};

const customEventVariants: Partial<
    Record<EventSchemaType, CustomEventVariant>
> = {
    'feature-environment-enabled': 'success',
    'feature-environment-disabled': 'neutral',
    'feature-archived': 'neutral',
};

interface IEventTimelineEventProps {
    event: TimelineEvent | TimelineEventGroup;
    startDate: Date;
    endDate: Date;
}

const isSignal = (
    event: TimelineEvent | TimelineEventGroup,
): event is ISignal => {
    return !Array.isArray(event) && 'source' in event;
};

export const EventTimelineEvent = ({
    event,
    startDate,
    endDate,
}: IEventTimelineEventProps) => {
    if (Array.isArray(event)) {
        return null;
    }

    if (isSignal(event)) {
        return null;
    }

    const timelineDuration = endDate.getTime() - startDate.getTime();
    const eventTime = new Date(event.createdAt).getTime();

    const position = `${((eventTime - startDate.getTime()) / timelineDuration) * 100}%`;

    const variant = customEventVariants[event.type] || 'secondary';

    return (
        <StyledEvent position={position}>
            <HtmlTooltip
                title={<EventTimelineEventTooltip event={event} />}
                maxWidth={320}
                arrow
            >
                <StyledEventCircle variant={variant}>
                    {getEventIcon(event.type)}
                </StyledEventCircle>
            </HtmlTooltip>
        </StyledEvent>
    );
};
