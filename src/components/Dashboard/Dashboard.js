import './Dashboard.css'
import { useGenericInfos } from '../../services/UserUserData';
import { useActivity } from '../../services/UserUserData';
import { useAverageSessions } from '../../services/UserUserData';
import { usePerformance } from '../../services/UserUserData';
import Welcome from './Welcome/Welcome';
import Calories from './Calories/Calories';
import Proteines from './Proteines/Proteines';
import Glucides from './Glucides/Glucides';
import Lipides from './Lipides/Lipides';
import Spacer from '../commons/Spacer/Spacer';
import Activity from './Activity/Activity';
import AverageSessions from './AverageSessions/AverageSessions';
import Performance from './Performance/Performance';
import Score from './Score/Score';
import NotFound from '../notfound/NotFound';

function Dashboard() {
    const { user } = useGenericInfos();
    const { activity } = useActivity();
    const { averageSessions } = useAverageSessions();
    const { performance } = usePerformance();
    const hasError = user.hasError || activity.hasError || averageSessions.hasError || performance.hasError;

    if (hasError) {
        return <NotFound />
    } else {
        return (
            <div className='Dashboard'>
                {user && !user.isLoading &&
                    <Welcome name={user.getName()} />
                }

                <div className='userActivities'>
                    <div className='charts'>
                        <div className='activities'>
                            {activity && activity.sessions &&
                                <Activity data={activity.sessions} />
                            }
                        </div>
                        <Spacer height={24} />
                        <div className='averagePerformanceScore'>
                            <div className='averageSessions'>
                                {averageSessions && averageSessions.sessions &&
                                    <AverageSessions data={averageSessions.sessions} dayName={averageSessions.sessions.day} />
                                }
                            </div>
                            <div className='performance'>
                                {performance && performance.data &&
                                    <Performance data={performance.data} />
                                }


                            </div>
                            <div className='score'>
                                {user && !user.isLoading &&
                                    <Score score={user.getScore()} />
                                }
                            </div>
                        </div>


                    </div>
                    {user && !user.isLoading &&
                        <div>
                            <Calories value={user.getCalorie()} />
                            <Spacer height={39} />
                            <Proteines value={user.getProtein()} />
                            <Spacer height={39} />
                            <Glucides value={user.getCarbohydrate()} />
                            <Spacer height={39} />
                            <Lipides value={user.getLipid()} />
                        </div>
                    }
                </div>
            </div>
        );
    }
}
export default Dashboard;