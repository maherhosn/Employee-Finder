import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Container,
  Box,
} from '@mui/material';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    const saved = localStorage.getItem('savedCandidates');
    return saved ? JSON.parse(saved) : [];
  });
  const [candidateInView, setCandidate] = useState<Candidate>({
    login: '',
    id: 0,
    avatar_url: '',
    html_url: '',
    name: '',
    location: '',
    email: '',
    company: '',
    bio: ''
  });

  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await searchGithub();
      setCandidates(data);
    };
    fetchCandidates();
  }, []);

  const saveCandidate = () => {
    const candidateToSave: Candidate = candidateInView;
    setSavedCandidates((prev: Candidate[]) => {
      const updated = [...prev, candidateToSave];
      localStorage.setItem('savedCandidates', JSON.stringify(updated));
      return updated;
    });
    nextCandidate();
  };

  const nextCandidate = () => {
    if (currentCandidateIndex < candidates.length - 1) {
      setCurrentCandidateIndex(currentCandidateIndex + 1);
    }
  };

  const currentCandidate: Candidate = candidates[currentCandidateIndex];
  useEffect(() => {
    if (currentCandidate) {
      const fetchCandidate = async () => {
        try {
          const data = await searchGithubUser(currentCandidate.login);
          setCandidate(data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchCandidate();
    }
  }, [currentCandidateIndex]);

  return (
    <Container>
      <Typography variant="h3" color="white" align="center" gutterBottom>
        Candidate Search
      </Typography>

      {currentCandidate !== candidates[candidates.length - 1] ? (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Card sx={{ maxWidth: 345, marginBottom: 4 }}>
            <CardMedia
              component="img"
              alt={candidateInView.login}
              height="140"
              image={candidateInView.avatar_url}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {candidateInView.login}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Location:</strong> {candidateInView.location}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Email:</strong> {candidateInView.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Company:</strong> {candidateInView.company}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Bio:</strong> {candidateInView.bio}
              </Typography>
            </CardContent>
          </Card>

          <Box display="flex" justifyContent="center" gap={2}>
            <Button
              variant="contained"
              color="error"
              onClick={nextCandidate}
              sx={{ padding: '1rem', fontSize: '1.5rem' }}
            >
              Next
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={saveCandidate}
              sx={{ padding: '1rem', fontSize: '1.5rem' }}
            >
              Save
            </Button>
          </Box>
        </Box>
      ) : (
        <Typography variant="h5" color="error" align="center" sx={{ marginTop: '20px' }}>
          No More Candidates Available
        </Typography>
      )}

      {savedCandidates.length === 0 && (
        <Typography variant="h5" color="textSecondary" align="center" sx={{ marginTop: '20px' }}>
          No candidates have been accepted.
        </Typography>
      )}

      <Grid container spacing={2} sx={{ marginTop: '20px' }}>
        {savedCandidates.map((candidate) => (
          <Grid item key={candidate.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt={candidate.login}
                height="140"
                image={candidate.avatar_url}
              />
              <CardContent>
                <Typography variant="h6">{candidate.login}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CandidateSearch;
