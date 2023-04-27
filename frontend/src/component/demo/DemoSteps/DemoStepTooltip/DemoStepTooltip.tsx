import {
    Button,
    Dialog,
    IconButton,
    Typography,
    alpha,
    styled,
} from '@mui/material';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { ITutorialTopic, ITutorialTopicStep } from 'component/demo/demo-topics';
import { TooltipRenderProps } from 'react-joyride';
import CloseIcon from '@mui/icons-material/Close';

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: theme.shape.borderRadiusMedium,
        width: '100%',
        maxWidth: theme.spacing(45),
        padding: theme.spacing(3),
    },
}));

const StyledTooltip = styled('div')(({ theme }) => ({
    '@keyframes pulse': {
        '0%': {
            boxShadow: `0 0 0 0 ${alpha(theme.palette.primary.main, 0.7)}`,
        },
        '70%': {
            boxShadow: `0 0 0 10px ${alpha(theme.palette.primary.main, 0)}`,
        },
        '100%': {
            boxShadow: `0 0 0 0 ${alpha(theme.palette.primary.main, 0)}`,
        },
    },
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadiusMedium,
    width: '100%',
    maxWidth: theme.spacing(45),
    padding: theme.spacing(3),
}));

const StyledCloseButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.neutral.main,
}));

const StyledTooltipTitle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1),
    flexWrap: 'wrap',
    paddingRight: theme.spacing(4),
}));

const StyledTooltipActions = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(3),
    '&&& button': {
        fontSize: theme.fontSizes.smallBody,
    },
}));

export interface IDemoStepTooltipProps extends TooltipRenderProps {
    step: ITutorialTopicStep;
    topic: number;
    topics: ITutorialTopic[];
    steps: number[];
    onClose: () => void;
    onBack: (step: ITutorialTopicStep) => void;
    onNext: (step: number) => void;
}

export const DemoStepTooltip = ({
    tooltipProps,
    step,
    topic,
    topics,
    steps,
    onClose,
    onBack,
    onNext,
}: IDemoStepTooltipProps) => {
    if (step.target === 'body') {
        return (
            <div {...tooltipProps}>
                <StyledDialog
                    open
                    onClose={(_, r) => {
                        if (r !== 'backdropClick') onClose();
                    }}
                    transitionDuration={0}
                >
                    <StyledCloseButton aria-label="close" onClick={onClose}>
                        <CloseIcon />
                    </StyledCloseButton>
                    <StyledTooltipTitle>
                        <ConditionallyRender
                            condition={Boolean(step.title)}
                            show={step.title}
                            elseShow={
                                <Typography fontWeight="bold">
                                    {topics[topic].title}
                                </Typography>
                            }
                        />
                    </StyledTooltipTitle>
                    {step.content}
                    <StyledTooltipActions>
                        <div>
                            <ConditionallyRender
                                condition={topic > 0 || steps[topic] > 0}
                                show={
                                    <Button
                                        variant="outlined"
                                        onClick={() => onBack(step)}
                                    >
                                        Back
                                    </Button>
                                }
                            />
                        </div>
                        <div>
                            <ConditionallyRender
                                condition={Boolean(step.nextButton)}
                                show={
                                    <Button
                                        onClick={() => onNext(steps[topic])}
                                        variant="contained"
                                        sx={{ alignSelf: 'flex-end' }}
                                    >
                                        {topic === topics.length - 1 &&
                                        steps[topic] ===
                                            topics[topic].steps.length - 1
                                            ? 'Finish'
                                            : 'Next'}
                                    </Button>
                                }
                            />
                        </div>
                    </StyledTooltipActions>
                </StyledDialog>
            </div>
        );
    }

    return (
        <StyledTooltip {...tooltipProps}>
            <StyledCloseButton aria-label="close" onClick={onClose}>
                <CloseIcon />
            </StyledCloseButton>
            <StyledTooltipTitle>
                <ConditionallyRender
                    condition={Boolean(step.title)}
                    show={step.title}
                    elseShow={
                        <Typography fontWeight="bold">
                            {topics[topic].title}
                        </Typography>
                    }
                />
            </StyledTooltipTitle>
            {step.content}
            <StyledTooltipActions>
                <div>
                    <ConditionallyRender
                        condition={topic > 0 || steps[topic] > 0}
                        show={
                            <Button
                                variant="outlined"
                                onClick={() => onBack(step)}
                            >
                                Back
                            </Button>
                        }
                    />
                </div>
                <div>
                    <ConditionallyRender
                        condition={Boolean(step.nextButton)}
                        show={
                            <Button
                                onClick={() => onNext(steps[topic])}
                                variant="contained"
                                sx={{ alignSelf: 'flex-end' }}
                            >
                                {topic === topics.length - 1 &&
                                steps[topic] === topics[topic].steps.length - 1
                                    ? 'Finish'
                                    : 'Next'}
                            </Button>
                        }
                    />
                </div>
            </StyledTooltipActions>
        </StyledTooltip>
    );
};
