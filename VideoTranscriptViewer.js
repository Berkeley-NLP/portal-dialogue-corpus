/**
 * VideoTranscriptViewer Component
 * A reusable component for displaying YouTube videos with synchronized transcripts
 */

class VideoTranscriptViewer {
    constructor(config = {}) {
        // Configuration
        this.containerElement = config.containerElement || document.body;
        this.data = [];
        this.currentSession = '';
        this.currentLevel = '';
        this.isTimelineView = false;
        this.activeTooltip = null;

        // Timestamp range for filtering and looping
        this.startTimestamp = null;
        this.endTimestamp = null;
        this.loopInterval = null;
        this.isLooping = false;

        // YouTube video mapping dictionary
        this.youtubeVideoMapping = {
            '01-Course1_Level1': 'https://www.youtube.com/watch?v=ZQfvFkhU0rA',
            '01-Course1_Level2': 'https://www.youtube.com/watch?v=BnnXwO_QOQM',
            '01-Course1_Level3': 'https://www.youtube.com/watch?v=7534m5zPqio',
            '01-Course1_Level4': 'https://www.youtube.com/watch?v=Kw-1XF2xcq0',
            '01-Course1_Level5': 'https://www.youtube.com/watch?v=5lnGevgdsAg',
            '01-Course1_Level6': 'https://www.youtube.com/watch?v=7ba5BnO9sTU',

            '02-Course1_Level1': 'https://www.youtube.com/watch?v=LZ_FuVlZBFU',
            '02-Course1_Level2': 'https://www.youtube.com/watch?v=onKxcLWVbwU',
            '02-Course1_Level3': 'https://www.youtube.com/watch?v=6K-NgJLBz6A',
            '02-Course1_Level4': 'https://www.youtube.com/watch?v=yf2IURs_26o',
            '02-Course1_Level5': 'https://www.youtube.com/watch?v=ltmxPPynSFw',
            '02-Course1_Level6': 'https://www.youtube.com/watch?v=DeBDZ642nR0',

            '03-Course1_Level1': 'https://www.youtube.com/watch?v=aH5IDckuVlQ',
            '03-Course1_Level2': 'https://www.youtube.com/watch?v=OCPPvkY8S-8',
            '03-Course1_Level3': 'https://www.youtube.com/watch?v=4WuH084_Mmo',
            '03-Course1_Level4': 'https://www.youtube.com/watch?v=yF-MsCQCTd4',
            '03-Course1_Level5': 'https://www.youtube.com/watch?v=zEF-EFeAxCY',
            '03-Course1_Level6': 'https://www.youtube.com/watch?v=JKeUGx623hw',

            '04-Course1_Level1': 'https://www.youtube.com/watch?v=pAhdBuWy1lY',
            '04-Course1_Level2': 'https://www.youtube.com/watch?v=pAP27AYsGhE',
            '04-Course1_Level3': 'https://www.youtube.com/watch?v=1TKCujUNoXw',
            '04-Course1_Level4': 'https://www.youtube.com/watch?v=yNw41ssA6zQ',
            '04-Course1_Level5': 'https://www.youtube.com/watch?v=aD9VBZRpjlM',
            '04-Course1_Level6': 'https://www.youtube.com/watch?v=6Gm5wy35mqY',
            '04-Course3_Level1': 'https://www.youtube.com/watch?v=UDV2AAXTo7s',
            '04-Course3_Level2': 'https://www.youtube.com/watch?v=TmV09gyNdZU',

            '05-Course1_Level1': 'https://www.youtube.com/watch?v=dNWgee-r00A',
            '05-Course1_Level2': 'https://www.youtube.com/watch?v=gy1pQtaGxcw',
            '05-Course1_Level3': 'https://www.youtube.com/watch?v=7tATnSuvG5o',
            '05-Course1_Level4': 'https://www.youtube.com/watch?v=WNR70S5nlNA',
            '05-Course1_Level5': 'https://www.youtube.com/watch?v=dNWgee-r00A',
            '05-Course1_Level6': 'https://www.youtube.com/watch?v=pYm47qTfmP4',
            '05-Course3_Level1': 'https://www.youtube.com/watch?v=NXge3a7rErA',
            '05-Course3_Level2': 'https://www.youtube.com/watch?v=tp35RNiCmmI',
            '05-Course3_Level3': 'https://www.youtube.com/watch?v=IdwMax1jhQI',
            '05-Course3_Level4': 'https://www.youtube.com/watch?v=5Yulv398ddU',

            '06-Course1_Level1': 'https://www.youtube.com/watch?v=0AGfr1jNm8c',
            '06-Course1_Level2': 'https://www.youtube.com/watch?v=4jQORd-DtTo',
            '06-Course1_Level3': 'https://www.youtube.com/watch?v=f2c6jFDUGcE',
            '06-Course1_Level4': 'https://www.youtube.com/watch?v=mEjq64-mccA',
            '06-Course1_Level5': 'https://www.youtube.com/watch?v=6mlJlyOH3g8',
            '06-Course1_Level6': 'https://www.youtube.com/watch?v=Tr-2He9KeUk',

            '07-Course1_Level1': 'https://www.youtube.com/watch?v=A8RgqKZkBqo',
            '07-Course1_Level2': 'https://www.youtube.com/watch?v=6Y0Z9jVTeRA',
            '07-Course1_Level3': 'https://www.youtube.com/watch?v=H5Z0Zzm03k8',
            '07-Course1_Level4': 'https://www.youtube.com/watch?v=cVZ_SR269z8',
            '07-Course1_Level5': 'https://www.youtube.com/watch?v=A-cnUIm0gxo',
            '07-Course1_Level6': 'https://www.youtube.com/watch?v=rv5CP7hVq0I',

            '08-Course1_Level1': 'https://www.youtube.com/watch?v=NKqP8cqefac',
            '08-Course1_Level2': 'https://www.youtube.com/watch?v=X9OTOPm1SL0',
            '08-Course1_Level3': 'https://www.youtube.com/watch?v=s-N-BbRQqzU',
            '08-Course1_Level4': 'https://www.youtube.com/watch?v=Hwr9xrPtdv4',
            '08-Course1_Level5': 'https://www.youtube.com/watch?v=02BfVIs2dLQ',
            '08-Course1_Level6': 'https://www.youtube.com/watch?v=_PzI7XevnaM',
            '08-Course3_Level1': 'https://www.youtube.com/watch?v=BrBS0oDY3_A',
            '08-Course3_Level2': 'https://www.youtube.com/watch?v=M_sO1rYK914',

            '09-Course1_Level1': 'https://www.youtube.com/watch?v=kJK7boAsN9c',
            '09-Course1_Level2': 'https://www.youtube.com/watch?v=g3zcxCnHWWo',
            '09-Course1_Level3': 'https://www.youtube.com/watch?v=5x7LkMMCT-I',
            '09-Course1_Level4': 'https://www.youtube.com/watch?v=-zoxRIQC0uY',
            '09-Course1_Level5': 'https://www.youtube.com/watch?v=XNSUqz4YwFQ',
            '09-Course1_Level6': 'https://www.youtube.com/watch?v=KtT4lavDxGI',
            '09-Course3_Level1': 'https://www.youtube.com/watch?v=0dtd1kcBN20',
            '09-Course3_Level2': 'https://www.youtube.com/watch?v=C4lJEZxaqjQ',
            '09-Course3_Level3': 'https://www.youtube.com/watch?v=rrdpRT-AKVA',
            '09-Course3_Level4': 'https://www.youtube.com/watch?v=X3o797CbCG8',

            '10-Course1_Level1': 'https://www.youtube.com/watch?v=uAnpYj39sAk',
            '10-Course1_Level2': 'https://www.youtube.com/watch?v=X5ngBVIEXc4',
            '10-Course1_Level3': 'https://www.youtube.com/watch?v=zAE6dzbw6Fw',
            '10-Course1_Level4': 'https://www.youtube.com/watch?v=E7qqeJphUWc',
            '10-Course1_Level5': 'https://www.youtube.com/watch?v=Aay_chq19Hk',
            '10-Course1_Level6': 'https://www.youtube.com/watch?v=skt_Mkz1RsI',
            '10-Course3_Level1': 'https://www.youtube.com/watch?v=iyvGcGlBveo',
            '10-Course3_Level2': 'https://www.youtube.com/watch?v=HlOctEGMBiU',
            '10-Course3_Level3': 'https://www.youtube.com/watch?v=S2M4Sm-e84c',

            '11-Course1_Level1': 'https://www.youtube.com/watch?v=r_cBWfAztGU',
            '11-Course1_Level2': 'https://www.youtube.com/watch?v=P0C5MUFqSAo',
            '11-Course1_Level3': 'https://www.youtube.com/watch?v=SuzECaT_qJw',
            '11-Course1_Level4': 'https://www.youtube.com/watch?v=91gpECeBW9g',
            '11-Course1_Level5': 'https://www.youtube.com/watch?v=l2pAmlwt7E4',
            '11-Course1_Level6': 'https://www.youtube.com/watch?v=uSxZbhrg9lA',
            '11-Course3_Level1': 'https://www.youtube.com/watch?v=3AX1pD_MFw4',
            '11-Course3_Level2': 'https://www.youtube.com/watch?v=MOWI8UWafL4',

            '12-Course1_Level1': 'https://www.youtube.com/watch?v=X4UPOHPEXoI',
            '12-Course1_Level2': 'https://www.youtube.com/watch?v=tDh4bq9b9zo',
            '12-Course1_Level3': 'https://www.youtube.com/watch?v=KXizAzjvyWE',
            '12-Course1_Level4': 'https://www.youtube.com/watch?v=q95wHWuXH0A',
            '12-Course1_Level5': 'https://www.youtube.com/watch?v=ZYdJevA8uxU',
            '12-Course1_Level6': 'https://www.youtube.com/watch?v=4ETUPqNhKPI',
            '12-Course3_Level1': 'https://www.youtube.com/watch?v=FZTTMov4Hy0',
            '12-Course3_Level2': 'https://www.youtube.com/watch?v=14jl9YPYsD4',
            '12-Course3_Level3': 'https://www.youtube.com/watch?v=VdexBOuq42A',

            '13-Course1_Level1': 'https://www.youtube.com/watch?v=zLGJY0aYNCM',
            '13-Course1_Level2': 'https://www.youtube.com/watch?v=3fLHSUH3ipo',
            '13-Course1_Level3': 'https://www.youtube.com/watch?v=G0Hob99oemU',
            '13-Course1_Level4': 'https://www.youtube.com/watch?v=jUSIweMEY5M',
            '13-Course1_Level5': 'https://www.youtube.com/watch?v=ivb7kHcY4OU',
            '13-Course1_Level6': 'https://www.youtube.com/watch?v=JewvJwkHs4U',

            '14-Course1_Level1': 'https://www.youtube.com/watch?v=hXYgNxAeaIU',
            '14-Course1_Level2': 'https://www.youtube.com/watch?v=FAa_VavjpjU',
            '14-Course1_Level3': 'https://www.youtube.com/watch?v=tO--TbgBxao',
            '14-Course1_Level4': 'https://www.youtube.com/watch?v=afCWWqn3L3w',
            '14-Course1_Level5': 'https://www.youtube.com/watch?v=toXT9q4ONfM',
            '14-Course1_Level6': 'https://www.youtube.com/watch?v=v82BaqPJ7Cs',
            '14-Course3_Level1': 'https://www.youtube.com/watch?v=ckoa9eXeBoc',
            '14-Course3_Level2': 'https://www.youtube.com/watch?v=GLo9nKLp93s',
            '14-Course3_Level3': 'https://www.youtube.com/watch?v=3zYNjuFCk2I',
            '14-Course3_Level4': 'https://www.youtube.com/watch?v=L9bG_RRb_6A',
            '14-Course3_Level5': 'https://www.youtube.com/watch?v=wv1Y3Q0HckU',

            '15-Course1_Level1': 'https://www.youtube.com/watch?v=o72p5KRth68',
            '15-Course1_Level2': 'https://www.youtube.com/watch?v=UfB_twOHX2I',
            '15-Course1_Level3': 'https://www.youtube.com/watch?v=KUsw_ZqSi2E',
            '15-Course1_Level4': 'https://www.youtube.com/watch?v=x6ZmU0aqqmI',
            '15-Course1_Level5': 'https://www.youtube.com/watch?v=6ssz72cQCiA',
            '15-Course1_Level6': 'https://www.youtube.com/watch?v=1EMYy2VTQPA',
            '15-Course3_Level1': 'https://www.youtube.com/watch?v=Vvea459bMSM',
            '15-Course3_Level2': 'https://www.youtube.com/watch?v=96NH7hXTDTw',
            '15-Course3_Level3': 'https://www.youtube.com/watch?v=Yc5NvmkoPXM',
            '15-Course3_Level4': 'https://www.youtube.com/watch?v=DrIMUX0Ahak',
            '15-Course3_Level5': 'https://www.youtube.com/watch?v=camj2goB1qI',

            '16-Course1_Level1': 'https://www.youtube.com/watch?v=caGL8f6PIY4',
            '16-Course1_Level2': 'https://www.youtube.com/watch?v=9a-8zIyW8S4',
            '16-Course1_Level3': 'https://www.youtube.com/watch?v=smjxSQpUii4',
            '16-Course1_Level4': 'https://www.youtube.com/watch?v=IRGM8zHfjbk',
            '16-Course1_Level5': 'https://www.youtube.com/watch?v=oRy_q0ye01w',
            '16-Course1_Level6': 'https://www.youtube.com/watch?v=2IUlBTYPrtg',
            '16-Course3_Level1': 'https://www.youtube.com/watch?v=Ev9TVnuwpiM',
            '16-Course3_Level2': 'https://www.youtube.com/watch?v=2GB9fSt_RH8',
            '16-Course3_Level3': 'https://www.youtube.com/watch?v=KUrrfPw9Pfo',
            '16-Course3_Level4': 'https://www.youtube.com/watch?v=LS2ahdf3A1w',
            '16-Course3_Level5': 'https://www.youtube.com/watch?v=je1qZ68cRdE',
            '16-Course3_Level6': 'https://www.youtube.com/watch?v=zjCTF6-BVc4',
            '16-Course3_Level7': 'https://www.youtube.com/watch?v=220SeoDEXUg',
            '16-Course3_Level8': 'https://www.youtube.com/watch?v=N4SpWS3aGYI',

            '17-Course1_Level1': 'https://www.youtube.com/watch?v=R5IT6v3Ts0k',
            '17-Course1_Level2': 'https://www.youtube.com/watch?v=wOF6zzRvii0',
            '17-Course1_Level3': 'https://www.youtube.com/watch?v=AR9sReLAaeU',
            '17-Course1_Level4': 'https://www.youtube.com/watch?v=8ozpQEWW2aE',
            '17-Course1_Level5': 'https://www.youtube.com/watch?v=pfmqoGcH3wc',
            '17-Course1_Level6': 'https://www.youtube.com/watch?v=HxVqsyIM5KY',
            '17-Course3_Level1': 'https://www.youtube.com/watch?v=nHgdVPI3MlM',
            '17-Course3_Level2': 'https://www.youtube.com/watch?v=spwjvZsfIt4',
            '17-Course3_Level3': 'https://www.youtube.com/watch?v=TpNkhhMSYf8',
            '17-Course3_Level4': 'https://www.youtube.com/watch?v=xQBVSKWrWTo',

            '18-Course1_Level1': 'https://www.youtube.com/watch?v=l3w5Gq1aTTo',
            '18-Course1_Level2': 'https://www.youtube.com/watch?v=i5-gLH4eyjU',
            '18-Course1_Level3': 'https://www.youtube.com/watch?v=Yw8sHCp_67E',
            '18-Course1_Level4': 'https://www.youtube.com/watch?v=hDHvKTzVktY',
            '18-Course1_Level5': 'https://www.youtube.com/watch?v=6eLj-d--Tkk',
            '18-Course1_Level6': 'https://www.youtube.com/watch?v=P4lPSNDavS4',
            '18-Course3_Level1': 'https://www.youtube.com/watch?v=OInaiVH206c',
            '18-Course3_Level2': 'https://www.youtube.com/watch?v=rmxtzi6v_ZM',
            '18-Course3_Level3': 'https://www.youtube.com/watch?v=w7rpSMwbSds'
        };

        // Tag mapping for abbreviations
        this.tagMappings = {
            'Success': { abbr: 'SUC', full: 'Communicative status: Success', category: 'comm' },
            'Abandoned': { abbr: 'ABN', full: 'Communicative status: Abandoned', category: 'comm' },
            'Correction': { abbr: 'COR', full: 'Communicative status: Correction', category: 'comm' },
            'Uninterpretable': { abbr: 'UNI', full: 'Communicative status: Uninterpretable', category: 'comm' },
            'Task-Related': { abbr: 'TSK', full: 'Information level: Task-Related', category: 'info' },
            'Communication Management': { abbr: 'COM', full: 'Information level: Communication Management', category: 'info' },
            'Affective Evaluation': { abbr: 'AFF', full: 'Information level: Affective Evaluation', category: 'info' },
            'World State': { abbr: 'WLD', full: 'Information level: World State', category: 'info' },
            'Not Enough Information': { abbr: 'NEI', full: 'Information level: Not Enough Information', category: 'info' },
            'Hedging': { abbr: 'HED', full: 'Uncertainty: Hedging', category: 'unc' },
            'Certainty': { abbr: 'CER', full: 'Uncertainty: Certainty', category: 'unc' },
            'Non-Sentential / Listener Response': { abbr: 'NSL', full: 'Uncertainty: Non-Sentential / Listener Response', category: 'unc' },
            'Imperative': { abbr: 'IMP', full: 'Uncertainty: Imperative', category: 'unc' },
            'Proposition': { abbr: 'PRO', full: 'Utterance type: Proposition', category: 'utt' },
            'Exclamation': { abbr: 'EXC', full: 'Utterance type: Exclamation', category: 'utt' },
            'Query': { abbr: 'QRY', full: 'Utterance type: Query', category: 'utt' },
            'Confirmation/Status Marker': { abbr: 'CSM', full: 'Discursive act: Confirmation/Status Marker', category: 'dis' },
            'Speculation, Not Enough Information': { abbr: 'SNI', full: 'Discursive act: Speculation, Not Enough Information', category: 'dis' }
        };

        this.categoryColors = {
            'comm': { bg: 'rgba(255, 182, 193, 0.8)', text: '#8B0000' },
            'info': { bg: 'rgba(173, 216, 230, 0.8)', text: '#00008B' },
            'unc': { bg: 'rgba(144, 238, 144, 0.8)', text: '#006400' },
            'utt': { bg: 'rgba(255, 218, 185, 0.8)', text: '#8B4513' },
            'dis': { bg: 'rgba(221, 160, 221, 0.8)', text: '#4B0082' }
        };

        // Create DOM elements
        this._createElements();
    }

    /**
     * Create the necessary DOM elements for the viewer
     */
    _createElements() {
        // Create content container
        this.contentContainer = document.createElement('div');
        this.contentContainer.className = 'content-container';
        this.contentContainer.style.display = 'none';

        // Create video container
        this.videoContainer = document.createElement('div');
        this.videoContainer.className = 'video-container';
        this.videoContainer.style.display = 'none';

        const videoTitle = document.createElement('h3');
        videoTitle.id = 'videoTitle';
        videoTitle.textContent = 'Video for Current Session/Level';

        this.videoEmbed = document.createElement('iframe');
        this.videoEmbed.id = 'videoEmbed';
        this.videoEmbed.width = '100%';
        this.videoEmbed.style.border = '0';
        this.videoEmbed.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        this.videoEmbed.allowFullscreen = true;

        this.videoContainer.appendChild(videoTitle);
        this.videoContainer.appendChild(this.videoEmbed);

        // Create utterances container
        this.utterancesContainer = document.createElement('div');
        this.utterancesContainer.className = 'utterances-container';

        this.utterancesDiv = document.createElement('div');
        this.utterancesDiv.id = 'utterances';

        this.timelineContainer = document.createElement('div');
        this.timelineContainer.className = 'timeline-container';

        const blueColumn = document.createElement('div');
        blueColumn.className = 'timeline-column blue';
        blueColumn.id = 'blueColumn';

        const orangeColumn = document.createElement('div');
        orangeColumn.className = 'timeline-column orange';
        orangeColumn.id = 'orangeColumn';

        this.timelineContainer.appendChild(blueColumn);
        this.timelineContainer.appendChild(orangeColumn);

        this.utterancesContainer.appendChild(this.utterancesDiv);
        this.utterancesContainer.appendChild(this.timelineContainer);

        // Append to content container
        this.contentContainer.appendChild(this.videoContainer);
        this.contentContainer.appendChild(this.utterancesContainer);

        // Append to main container
        this.containerElement.appendChild(this.contentContainer);

        // Setup tooltip listeners
        this._setupGlobalTooltipListeners();
    }

    /**
     * Setup global listeners for tooltips
     */
    _setupGlobalTooltipListeners() {
        window.addEventListener('scroll', () => {
            if (this.activeTooltip) {
                const target = document.querySelector(`[title="${this.activeTooltip.textContent}"]`);
                if (target) {
                    this._positionTooltip(this.activeTooltip, target);
                }
            }
        }, true);

        window.addEventListener('resize', () => {
            if (this.activeTooltip) {
                const target = document.querySelector(`[title="${this.activeTooltip.textContent}"]`);
                if (target) {
                    this._positionTooltip(this.activeTooltip, target);
                }
            }
        });
    }

    /**
     * Load data from a CSV file or array
     */
    loadData(dataSource) {
        if (typeof dataSource === 'string') {
            // Load from CSV file
            return new Promise((resolve, reject) => {
                Papa.parse(dataSource, {
                    header: true,
                    download: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        this.data = results.data;
                        resolve(this.data);
                    },
                    error: (err) => {
                        console.error('CSV load error:', err);
                        reject(err);
                    }
                });
            });
        } else if (Array.isArray(dataSource)) {
            // Use array directly
            this.data = dataSource;
            return Promise.resolve(this.data);
        }
    }

    /**
     * Display content for a specific session and level
     * @param {string} session - Session identifier
     * @param {string} level - Level identifier
     * @param {string} searchTerm - Optional search term to highlight
     * @param {string} startTimestamp - Optional start timestamp (HH:MM:SS or MM:SS)
     * @param {string} endTimestamp - Optional end timestamp (HH:MM:SS or MM:SS)
     */
    displayContent(session, level, searchTerm = '', startTimestamp = null, endTimestamp = null) {
        this.currentSession = session;
        this.currentLevel = level;
        this.startTimestamp = startTimestamp;
        this.endTimestamp = endTimestamp;

        if (!session || !level) {
            this.contentContainer.style.display = 'none';
            return;
        }

        let rows = this.data
            .filter(d => d.session === session && d.level === level)
            .sort((a, b) => this._timeToSeconds(a.start_time) - this._timeToSeconds(b.start_time));

        // Filter by timestamp range if provided
        if (startTimestamp || endTimestamp) {
            rows = this._filterByTimestampRange(rows, startTimestamp, endTimestamp);
        }

        // Show content container and embedded video
        this.contentContainer.style.display = 'flex';
        this._showEmbeddedVideo(session, level);

        // Set up video looping if timestamps are provided
        if (startTimestamp && endTimestamp) {
            this._setupVideoLoop(startTimestamp, endTimestamp);
        } else {
            this._stopVideoLoop();
        }

        if (this.isTimelineView) {
            this._displayTimelineView(rows, searchTerm);
        } else {
            this._displayListView(rows, searchTerm);
        }
    }

    /**
     * Toggle between list and timeline view
     */
    toggleView() {
        this.isTimelineView = !this.isTimelineView;

        if (this.isTimelineView) {
            this.utterancesDiv.style.display = 'none';
            this.timelineContainer.classList.add('active');
        } else {
            this.utterancesDiv.style.display = 'block';
            this.timelineContainer.classList.remove('active');
        }

        if (this.currentSession && this.currentLevel) {
            this.displayContent(this.currentSession, this.currentLevel, '');
        }
    }

    /**
     * Get YouTube video URL for a session/level combination
     */
    _getYouTubeVideoUrl(session, level) {
        const key = `${session}-${level}`;
        return this.youtubeVideoMapping[key] || null;
    }

    /**
     * Convert YouTube URL to embeddable format
     */
    _convertToEmbedUrl(youtubeUrl, startTime = null, endTime = null) {
        if (!youtubeUrl) return null;

        const videoIdMatch = youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
        if (!videoIdMatch) return null;

        const videoId = videoIdMatch[1];
        let url = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;

        // Add start time parameter if provided
        if (startTime !== null) {
            url += `&start=${Math.floor(startTime)}`;
        }

        // Note: YouTube doesn't support end time in embed URLs for looping
        // We'll handle looping programmatically

        return url;
    }

    /**
     * Show embedded video for current session/level
     */
    _showEmbeddedVideo(session, level) {
        const videoUrl = this._getYouTubeVideoUrl(session, level);
        if (!videoUrl) {
            this.videoContainer.style.display = 'none';
            return;
        }

        // Use timestamp range if available
        const startSeconds = this.startTimestamp ? this._parseTimestamp(this.startTimestamp) : null;
        const endSeconds = this.endTimestamp ? this._parseTimestamp(this.endTimestamp) : null;

        const embedUrl = this._convertToEmbedUrl(videoUrl, startSeconds, endSeconds);
        if (!embedUrl) {
            this.videoContainer.style.display = 'none';
            return;
        }

        this.videoEmbed.src = embedUrl;

        let titleText = `Video for Session ${session}, Level ${level}`;
        if (this.startTimestamp && this.endTimestamp) {
            titleText += ` (${this.startTimestamp} - ${this.endTimestamp})`;
        }
        this.videoContainer.querySelector('#videoTitle').textContent = titleText;
        this.videoContainer.style.display = 'block';
    }

    /**
     * Create timestamp link that seeks the embedded video
     */
    _createYouTubeTimestampLink(timestamp, session, level) {
        const videoUrl = this._getYouTubeVideoUrl(session, level);
        if (!videoUrl) {
            return timestamp;
        }

        const seconds = this._timeToSeconds(timestamp);
        return `<a href="javascript:void(0)" onclick="window.videoTranscriptViewer.seekEmbeddedVideo(${seconds})" class="youtube-timestamp-link">${timestamp}</a>`;
    }

    /**
     * Seek the embedded video to a specific time
     */
    seekEmbeddedVideo(seconds) {
        if (this.videoContainer.style.display === 'none') {
            return;
        }

        this.videoEmbed.contentWindow.postMessage(
            '{"event":"command","func":"seekTo","args":[' + seconds + ',true]}',
            '*'
        );
    }

    /**
     * Filter utterances by timestamp range
     */
    _filterByTimestampRange(rows, startTimestamp, endTimestamp) {
        const startSeconds = startTimestamp ? this._parseTimestamp(startTimestamp) : 0;
        const endSeconds = endTimestamp ? this._parseTimestamp(endTimestamp) : Infinity;

        return rows.filter(row => {
            const utteranceStart = this._timeToSeconds(row.start_time);
            const utteranceEnd = this._timeToSeconds(row.end_time || row.start_time);

            // Include if the utterance overlaps with the range
            return utteranceStart < endSeconds && utteranceEnd > startSeconds;
        });
    }

    /**
     * Parse a timestamp string (supports HH:MM:SS, MM:SS, or SS formats)
     */
    _parseTimestamp(timestamp) {
        if (!timestamp) return 0;

        // Handle numeric input (already in seconds)
        if (typeof timestamp === 'number') {
            return timestamp;
        }

        const parts = timestamp.split(':');

        if (parts.length === 3) {
            // HH:MM:SS or HH:MM:SS.mmm
            return this._timeToSeconds(timestamp);
        } else if (parts.length === 2) {
            // MM:SS
            const [minutes, seconds] = parts;
            const secParts = seconds.split('.');
            return (+minutes) * 60 + (+secParts[0]) + (+(secParts[1] || 0)) / 1000;
        } else if (parts.length === 1) {
            // SS
            return parseFloat(timestamp);
        }

        return 0;
    }

    /**
     * Setup video looping between start and end timestamps
     */
    _setupVideoLoop(startTimestamp, endTimestamp) {
        this._stopVideoLoop(); // Clear any existing loop

        const startSeconds = this._parseTimestamp(startTimestamp);
        const endSeconds = this._parseTimestamp(endTimestamp);

        // Store loop bounds
        this._loopStart = startSeconds;
        this._loopEnd = endSeconds;

        // Seek to start position
        setTimeout(() => {
            this.seekEmbeddedVideo(startSeconds);
        }, 500); // Wait for iframe to load

        // Set up interval to check video position and loop
        this.isLooping = true;
        this._videoCheckCount = 0;

        this.loopInterval = setInterval(() => {
            this._checkAndLoopVideo();
        }, 500); // Check every 500ms
    }

    /**
     * Check video position and loop if needed
     * Uses time-based estimation since YouTube IFrame API doesn't allow direct getCurrentTime
     */
    _checkAndLoopVideo() {
        if (!this.isLooping || !this._loopStart || !this._loopEnd) return;

        this._videoCheckCount++;

        // Calculate elapsed time since loop started (in seconds)
        const loopDuration = this._loopEnd - this._loopStart;

        // Every loop duration + buffer, seek back to start
        // This is an approximation since we can't get exact position from iframe
        const cycleTime = (this._videoCheckCount * 0.5) % (loopDuration + 1);

        if (cycleTime >= loopDuration) {
            // Time to loop back
            this.seekEmbeddedVideo(this._loopStart);
            this._videoCheckCount = 0;
        }
    }

    /**
     * Stop video looping
     */
    _stopVideoLoop() {
        if (this.loopInterval) {
            clearInterval(this.loopInterval);
            this.loopInterval = null;
        }
        this.isLooping = false;
    }

    /**
     * Enable video looping for the current timestamp range
     */
    enableLooping() {
        if (this.startTimestamp && this.endTimestamp) {
            this._setupVideoLoop(this.startTimestamp, this.endTimestamp);
        }
    }

    /**
     * Disable video looping
     */
    disableLooping() {
        this._stopVideoLoop();
    }

    /**
     * Convert timestamp to seconds
     */
    _timeToSeconds(t) {
        if (!t) return 0;
        const parts = t.split(':');
        const secParts = parts[2].split('.');
        return (+parts[0]) * 3600 + (+parts[1]) * 60 + (+secParts[0]) + (+(secParts[1] || 0)) / 1000;
    }

    /**
     * Highlight search terms in text
     */
    _highlightSearchTerms(text, searchTerm) {
        if (!searchTerm) return text;
        const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    }

    /**
     * Get tag information
     */
    _getTagInfo(value) {
        if (!value || value.trim() === '') return null;

        const cleanValue = value.replace(/^["']|["']$/g, '').trim();

        if (this.tagMappings[cleanValue]) {
            return this.tagMappings[cleanValue];
        }

        for (const [key, info] of Object.entries(this.tagMappings)) {
            if (cleanValue.includes(key) || key.includes(cleanValue)) {
                return info;
            }
        }

        const words = cleanValue.split(' ');
        const abbr = words.map(word => word.charAt(0).toUpperCase()).join('').substring(0, 3);
        return { abbr, full: cleanValue, category: 'unknown' };
    }

    /**
     * Create tooltip
     */
    _createTooltip(text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = text;
        document.body.appendChild(tooltip);
        return tooltip;
    }

    /**
     * Position tooltip
     */
    _positionTooltip(tooltip, target) {
        const rect = target.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        let left = rect.left + (rect.width / 2);
        let top = rect.top;

        const viewportWidth = window.innerWidth;

        if (left < tooltipRect.width / 2) {
            left = tooltipRect.width / 2;
        } else if (left + (tooltipRect.width / 2) > viewportWidth) {
            left = viewportWidth - (tooltipRect.width / 2);
        }

        if (top < tooltipRect.height) {
            top = rect.bottom + 8;
            tooltip.style.transform = 'translateX(-50%) translateY(0)';
        } else {
            top = top;
            tooltip.style.transform = 'translateX(-50%) translateY(-100%)';
        }

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
    }

    /**
     * Setup tooltip listeners for an element
     */
    _setupTooltipListeners(element) {
        element.addEventListener('mouseenter', (e) => {
            if (this.activeTooltip) {
                this.activeTooltip.remove();
            }
            const text = e.target.getAttribute('title');
            if (text) {
                e.target.removeAttribute('title');
                this.activeTooltip = this._createTooltip(text);
                this._positionTooltip(this.activeTooltip, e.target);
            }
        });

        element.addEventListener('mouseleave', (e) => {
            if (this.activeTooltip) {
                e.target.setAttribute('title', this.activeTooltip.textContent);
                this.activeTooltip.remove();
                this.activeTooltip = null;
            }
        });

        let parent = element.parentElement;
        while (parent) {
            if (parent.scrollHeight > parent.clientHeight) {
                parent.addEventListener('scroll', () => {
                    if (this.activeTooltip && this.activeTooltip.dataset.target === element) {
                        this._positionTooltip(this.activeTooltip, element);
                    }
                });
            }
            parent = parent.parentElement;
        }
    }

    /**
     * Display list view
     */
    _displayListView(rows, searchTerm) {
        this.utterancesDiv.innerHTML = '';

        rows.forEach(r => {
            const utteranceText = r.utterance || '';
            const row = document.createElement('div');
            row.className = `utterance speaker-${r.speaker.toLowerCase()}`;

            const timeDiv = document.createElement('div');
            timeDiv.className = 'timeline-time';
            const timestampLink = this._createYouTubeTimestampLink(r.start_time, r.session, r.level);
            timeDiv.innerHTML = timestampLink;
            row.appendChild(timeDiv);

            const textDiv = document.createElement('div');
            textDiv.className = 'timeline-text';

            let displayText = utteranceText;
            if (utteranceText.length > 100) {
                displayText = utteranceText.substring(0, 97) + '...';
            }

            const highlightedText = this._highlightSearchTerms(displayText, searchTerm);
            textDiv.innerHTML = highlightedText;
            row.appendChild(textDiv);

            const tagsContainer = this._createTagsContainer(r, searchTerm, 'utterance-tags', 'tag');
            row.appendChild(tagsContainer);
            this.utterancesDiv.appendChild(row);
        });
    }

    /**
     * Display timeline view
     */
    _displayTimelineView(rows, searchTerm) {
        const blueColumn = this.timelineContainer.querySelector('#blueColumn');
        const orangeColumn = this.timelineContainer.querySelector('#orangeColumn');

        blueColumn.innerHTML = '';
        orangeColumn.innerHTML = '';

        if (rows.length === 0) return;

        const startTime = this._timeToSeconds(rows[0].start_time);
        const endTime = this._timeToSeconds(rows[rows.length - 1].end_time || rows[rows.length - 1].start_time);
        const totalDuration = endTime - startTime;
        const pixelsPerSecond = 80;
        const layoutHeight = Math.max(600, totalDuration * pixelsPerSecond);
        const visualHeight = layoutHeight + 80; // extra space so final utterance stays inside container

        this.timelineContainer.style.height = visualHeight + 'px';

        rows.forEach((r, index) => {
            const utteranceText = r.utterance || '';
            const startSeconds = this._timeToSeconds(r.start_time);
            const endSeconds = this._timeToSeconds(r.end_time || r.start_time);
            const duration = endSeconds - startSeconds;

            const top = ((startSeconds - startTime) / totalDuration) * layoutHeight;
            const height = Math.max(50, (duration / totalDuration) * layoutHeight);

            const utterance = document.createElement('div');
            utterance.className = `timeline-utterance ${r.speaker.toLowerCase()}`;
            utterance.style.top = top + 'px';
            utterance.style.height = height + 'px';
            utterance.style.zIndex = index + 1;

            utterance.addEventListener('mouseenter', function() {
                this.style.zIndex = '100';
            });

            utterance.addEventListener('mouseleave', function() {
                this.style.zIndex = (index + 1).toString();
            });

            const timeDiv = document.createElement('div');
            timeDiv.className = 'timeline-time';
            const timestampLink = this._createYouTubeTimestampLink(r.start_time, r.session, r.level);
            timeDiv.innerHTML = timestampLink;
            utterance.appendChild(timeDiv);

            const textDiv = document.createElement('div');
            textDiv.className = 'timeline-text';

            let displayText = utteranceText;
            if (utteranceText.length > 100) {
                displayText = utteranceText.substring(0, 97) + '...';
            }

            const highlightedText = this._highlightSearchTerms(displayText, searchTerm);
            textDiv.innerHTML = highlightedText;
            utterance.appendChild(textDiv);

            const tagsContainer = this._createTagsContainer(r, searchTerm, 'timeline-tags', 'timeline-tag');
            utterance.appendChild(tagsContainer);

            if (r.speaker.toLowerCase() === 'blue') {
                blueColumn.appendChild(utterance);
            } else {
                orangeColumn.appendChild(utterance);
            }
        });
    }

    /**
     * Create tags container for an utterance
     */
    _createTagsContainer(utterance, searchTerm, containerClass, tagClass) {
        const tagsContainer = document.createElement('div');
        tagsContainer.className = containerClass;

        const fields = [
            { value: utterance.communicative_status, type: 'comm' },
            { value: utterance.information_level, type: 'info' },
            { value: utterance.uncertainty, type: 'unc' },
            { value: utterance.utterance_type, type: 'utt' },
            { value: utterance.discursive_act, type: 'dis' }
        ];

        fields.forEach(field => {
            const tagInfo = this._getTagInfo(field.value);
            if (tagInfo) {
                const tag = document.createElement('span');
                tag.className = tagClass;

                if (searchTerm && this._tagMatchesSearch(field.value, searchTerm)) {
                    tag.innerHTML = this._highlightSearchTerms(tagInfo.abbr, searchTerm);
                } else {
                    tag.textContent = tagInfo.abbr;
                }

                tag.setAttribute('title', tagInfo.full);
                this._setupTooltipListeners(tag);

                const category = field.type;
                if (this.categoryColors[category]) {
                    tag.style.backgroundColor = this.categoryColors[category].bg;
                    tag.style.color = this.categoryColors[category].text;
                } else {
                    tag.style.backgroundColor = 'rgba(200, 200, 200, 0.8)';
                    tag.style.color = '#333';
                }

                tagsContainer.appendChild(tag);
            }
        });

        return tagsContainer;
    }

    /**
     * Check if a tag matches the search term
     */
    _tagMatchesSearch(tagValue, searchTerm) {
        if (!searchTerm) return false;
        const searchLower = searchTerm.toLowerCase();
        const tagInfo = this._getTagInfo(tagValue);

        const searchTargets = [
            tagValue.toLowerCase(),
            tagInfo ? tagInfo.abbr.toLowerCase() : '',
            tagInfo ? tagInfo.full.toLowerCase() : ''
        ];

        return searchTargets.some(target => target.includes(searchLower));
    }
}

// Make it globally available
if (typeof window !== 'undefined') {
    window.VideoTranscriptViewer = VideoTranscriptViewer;
}
