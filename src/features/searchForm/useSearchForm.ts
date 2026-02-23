import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { SearchFormSchema } from '@schemas/search/search.schema';
import type { SearchForm } from '@schemas/search/search.schema';

export default function useSearchForm(
  location: 'page' | 'widget' | 'header',
  headerSearchActive: boolean = false,
  handleHeaderSearchActive: () => void = () => {}
) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    setFocus,
  } = useForm({
    resolver: zodResolver(SearchFormSchema),
  });

  const onSubmit = async (data: SearchForm) => {
    navigate(`/search/${data.term}`);

    if (location === 'header' && headerSearchActive) {
      handleHeaderSearchActive();
    }

    reset();
  };

  useEffect(() => {
    if (headerSearchActive) {
      setFocus('term');
    }
  }, [headerSearchActive, setFocus]);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
  };
}
