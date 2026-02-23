import Input from '@components/Form/Input';
import Button from '@components/UI/Button';

import useSearchForm from './useSearchForm';

interface SearchFormProps {
  location?: 'page' | 'widget' | 'header';
  headerSearchActive?: boolean;
  handleHeaderSearchActive?: () => void;
}

export default function SearchForm({ location = 'page', headerSearchActive = false, handleHeaderSearchActive = () => {} }: SearchFormProps) {
  const { register, handleSubmit, onSubmit, errors } = useSearchForm(location, headerSearchActive, handleHeaderSearchActive);

  const searchFormClasses = location === 'page' ? 'justify-between' : location === 'widget' ? 'flex-col' : '';
  const searchInputClasses = location === 'header' ? 'bg-transparent! !border-0 !text-4xl !text-white text-center placeholder:text-white' : '';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`flex gap-6 ${searchFormClasses}`} aria-label="Search" noValidate>
      <Input
        type="text"
        {...register('term')}
        placeholder="Type to search..."
        label="Type to search..."
        className={searchInputClasses}
        error={errors.term?.message}
      />
      {location !== 'header' && (
        <Button type="submit" className="max-h-12.5">
          Search
        </Button>
      )}
    </form>
  );
}
