import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { useEffect } from 'react';

const QuillEditor = (props) => {

  // console.log(quill);    // undefined > Quill Object
  // console.log(quillRef); // { current: undefined } > { current: Quill Editor Reference }
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered'}, { list: 'bullet' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['link'],
    ],
  };

  const { quill, quillRef } = useQuill({modules});

  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        props.setInfo(quill.root.innerHTML) // Get innerHTML using quill
      });
    }
  }, [quill]);

  return (
    <div className="w-full text-gray-800">
      <div ref={quillRef} />
    </div>
  );
}

export default QuillEditor