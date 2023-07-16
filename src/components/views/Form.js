import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { outputForm, fullText, promptType } from '../../utils';
import { DownloadButton } from '../index';
import Header from '../Header';

export default () => {
    const { pageNum } = useParams();
    const page = fullText[pageNum];

    const [formValues, setFormValues] = useState(outputForm);

    const inputFields = (prompt, index) => {
        switch (prompt.type) {
            case promptType.yesNo:
                return (
                    <div>
                        <label htmlFor={prompt.text + 'yes'} className='radio-label yes'>
                            yes
                            <input
                                className='radio'
                                name={prompt.text}
                                id={prompt.text + 'yes'}
                                checked={formValues[prompt.text] === 'yes'}
                                value='yes'
                                type='radio'
                                onChange={handleOnChange}
                                autoFocus={index === 0}
                            ></input>
                        </label>
                        &nbsp;
                        <label htmlFor={prompt.text + 'no'} className='radio-label no'>
                            no
                            <input
                                className='radio'
                                name={prompt.text}
                                id={prompt.text + 'no'}
                                checked={formValues[prompt.text] === 'no'}
                                value='no'
                                type='radio'
                                onChange={handleOnChange}
                            ></input>
                        </label>
                    </div>
                );
            case promptType.smallText:
                return (
                    <>
                        <label htmlFor={prompt.text}>{prompt.text}</label>
                        <br />
                        <input
                            className='text-input'
                            name={prompt.text}
                            value={formValues[prompt.text]}
                            onChange={handleOnChange}
                            maxLength={3000}
                            autoFocus={index === 0}
                        ></input>
                    </>
                );
            case promptType.bigText:
                return (
                    <>
                        <label htmlFor={prompt.text}>{prompt.text}</label>
                        <br />
                        <textarea
                            className='text-input'
                            name={prompt.text}
                            value={formValues[prompt.text]}
                            wordwrap='wrap'
                            onChange={handleOnChange}
                            rows={5}
                            maxLength={3000}
                            autoFocus={index === 0}
                        ></textarea>
                    </>
                );
            case promptType.plainText:
                return (
                    <>
                        <label htmlFor={prompt.text}>{prompt.text}</label>
                    </>
                );
            default:
                console.log('ERROR inputFields received: ', prompt);
                break;
        }
    };

    const handleOnChange = async (ev) => {
        if (ev.target.type !== 'radio') ev.preventDefault();
        await setFormValues({ ...formValues, [ev.target.name]: ev.target.value });
        outputForm[ev.target.name] = ev.target.value;
    };

    return (
        <div className='content-container'>
            <form>
                <h3 className='center-text'>{page.title}</h3>
                <ul className={`prompt-list-container ${pageNum * 1 === 0 ? ' intro' : ''}`}>
                    {page.prompts.map((prompt, index) => {
                        return (
                            prompt.text !== 'Notes' && (
                                <li key={prompt.text}>
                                    <div className={`prompt-container`}>
                                        {prompt.type === promptType.yesNo ? (
                                            <div className='yesNo'>
                                                {prompt.text}&ensp;{inputFields(prompt, index)}
                                            </div>
                                        ) : (
                                            <>
                                                <div>{inputFields(prompt, index)}</div>
                                            </>
                                        )}
                                    </div>
                                    {prompt.sub && (
                                        <div className='prompt-container'>
                                            <div> {inputFields(prompt.sub, index)}</div>
                                        </div>
                                    )}
                                </li>
                            )
                        );
                    })}
                </ul>
            </form>
            {pageNum === '6' && (
                <div id='notes-container'>
                    <div id='notes-label'>
                        <label htmlFor='notes'>Notes:</label>
                    </div>
                    <textarea
                        className='text-input'
                        id='notes'
                        name='Notes'
                        value={formValues['Notes']}
                        wordwrap='wrap'
                        onChange={handleOnChange}
                        rows={16}
                        maxLength={3000}
                        autoFocus={window.visualViewport.width > 445}
                    ></textarea>
                </div>
            )}
            <div className='teeny hidden' name='lower nav bar'>
                {<Header />}
            </div>
            {pageNum === '0' && (
                <div id='begin-container'>
                    <Link to='/1' name='button' className='begin button unstyled-link' style={{ width: '30%' }}>
                        <label htmlFor='button'>Begin</label>
                    </Link>
                </div>
            )}
            {pageNum === '6' && <DownloadButton />}
        </div>
    );
};
