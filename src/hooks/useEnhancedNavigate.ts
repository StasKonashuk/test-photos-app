import { useNavigate } from 'react-router-dom';

type BehaviorType = 'auto' | 'smooth';

interface ScrollNavigateProps {
  top: number;
  left: number;
  path?: string;
  behavior?: BehaviorType;
  replace?: boolean;
}

const RETURN = -1;

export function useEnhancedNavigate() {
  const navigate = useNavigate();
  const scrollNavigate = ({
    top,
    left,
    path,
    replace = false,
    behavior = 'smooth',
  }: ScrollNavigateProps) => {
    window.scrollTo({ left, top, behavior });
    if (path) {
      navigate(path, { replace });
    }
  };
  const navigateBack = () => {
    navigate(RETURN);
  };
  return { scrollNavigate, navigateBack };
}
